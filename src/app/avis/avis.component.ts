import { ChangeDetectorRef, Component } from '@angular/core';
import { AddAvisComponent } from '../add-avis/add-avis.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentService } from '../document.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { API_BASE_URL } from '../base/base_url';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent {

  avisList: any[] = [
    {  isSelected: false },
  ];
  searchTerm: string = '';
  avisListJson: string = '';
  currentPage: number = 1;  // Page actuelle
  itemsPerPage: number = 2;  // Nombre d'éléments par page
  totalPages: number = 0;  
  dataSource = new MatTableDataSource<any>();
  constructor(private cdRef: ChangeDetectorRef,private documentService: DocumentService,private sanitizer: DomSanitizer,public dialog: MatDialog,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // this.documentService.getArchives().subscribe((data: any) => {
    //   this.avisList = data;
    //   this.dataSource.data = this.avisList; 
    // });
    this.fetchAvis();
    
  }


  fetchAvis(searchTerm: string = '') {
    // Utilisez l'URL de votre API avec le token d'authentification
    this.http.get<any[]>('http://127.0.0.1:8000/api/avis-by-admin/'+localStorage.getItem('id')+'/' + searchTerm, {
      headers: {
        'Authorization': 'JWT '+localStorage.getItem('access')
      }
    }).subscribe(
      data => {
        this.avisList = data;
        // Désinfecter les URLs
        this.avisList.forEach(avis => {
          avis.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${avis.file}`);
        });
        console.log(data);
      },
      error => {
        console.error('Erreur lors de la récupération des avis:', error);
      }
    );
  }
  
  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(AddAvisComponent, {
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true // To prevent closing by clicking outside the dialog
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle any result or perform actions after the dialog is closed
    });
  }

  toggleSelection(avis: any) {
    avis.isSelected = !avis.isSelected;
  }
  
  deleteAvis(avis: number) {
    const url = `${API_BASE_URL}delete-avis/${avis}/`;

    // Set up headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`
    });

    // Send a DELETE request to the API
    this.http.delete(url, { headers }).subscribe(
      () => {
        // Document deleted successfully, handle any further actions
        console.log('delete success')
         // Reload the current page by navigating to the same route
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
      },
      (error: any) => {
        console.error('Error deleting document:', error);
        // Handle the error, display a message, etc.
      }
    );
  }


  
  openConfirmationDialog(documentId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.deleteAvis(documentId);
      }
    });
  }
  
  // deleteAvis(avis: any) {
  //   // Code pour supprimer l'avis
  //   // ...
  // }
  // applyFilter(): void {
  //   this.fetchAvis(this.searchTerm);
  // }
  // private updateFilteredData(): void {
  //   this.dataSource.filteredData = this.avisList.filter(avis => {
  //     // Implémentez ici la logique de filtrage basée sur this.searchTerm
  //     // Par exemple:
  //     return avis.titre.toLowerCase().includes(this.searchTerm.toLowerCase());
  //   });
  // }
    // Méthode pour appliquer un filtre de recherche
    applyFilter() {
      // Apply the filter directly to the MatTableDataSource
      this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    }
  
    // Méthodes pour naviguer entre les pages
    goToPage(page: number): void {
      this.currentPage = page;
      this.fetchAvis();
    }
  
    nextPage(): void {
      this.cdRef.detectChanges();
    }
  
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchAvis();
      }
    }
}
