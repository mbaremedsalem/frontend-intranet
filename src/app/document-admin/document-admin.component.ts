import { Component } from '@angular/core';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL, url } from '../base/base_url';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { DocumentService } from '../document.service';
import { DocumentSelectionService } from '../document-selection.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-admin',
  templateUrl: './document-admin.component.html',
  styleUrls: ['./document-admin.component.css']
})
export class DocumentAdminComponent {
  documents: any[] = [];
  useTraditionalTable = false;

  displayedColumns: string[] = ['sujet', 'code', 'description', 'file', 'direction_nom','date_ajout','actions'];
  isAdmin: boolean = false;
  isAgent: boolean = false;
  // Define the MatTableDataSource for the Material table
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  filteredDocuments: any[] = [];
  my_url!:string;
  constructor(private documentService: DocumentService,private documentSelectionService: DocumentSelectionService,public dialog: MatDialog,private sanitizer: DomSanitizer,private http: HttpClient, private router: Router) { }

  // ngOnInit(): void {
  //   this.documentService.getAllDocuments().subscribe((data: any[]) => {
  //     this.documents = data;
  //     this.dataSource.data = this.documents; // Set the data for the Material table
  //   });
  // }
  
  ngOnInit(): void {
    this.my_url = url;
    const role = window.localStorage.getItem('role');
    this.isAdmin = role === 'Admin';
    this.isAgent = role === 'Agent';
    // getAllDocumentsUser
    if (this.isAdmin) {
      this.documentService.getAllDocuments().subscribe((data: any[]) => {
        this.documents = data;
        this.dataSource.data = this.documents; // Set the data for the Material table
    
        // Désinfecter les URLs
        this.documents.forEach(document => {
          document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}${document.file}`);
        });
      });
    } else {
      this.documentService.getAllDocumentsUser().subscribe((data: any[]) => {
        this.documents = data;
        this.dataSource.data = this.documents; // Set the data for the Material table
    
        // Désinfecter les URLs
        this.documents.forEach(document => {
          document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}${document.file}`);
        });
      });
    }
  }

  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
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



  deleteDocument(documentId: number) {
    const url = `${API_BASE_URL}delete-chart/${documentId}`;

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
        this.deleteDocument(documentId);
      }
    });
  }
  


  // -------
  openUpdateDialog(documentId: number) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { documentId: documentId },
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.updateDocument(documentId, formData);
      }
    });
  }

  updateDocument(id: number, formData: FormData): void {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
  
    this.http.put(`${API_BASE_URL}update-document/${id}`, formData, { headers }).subscribe(
      (response) => {
        // Gérer la réponse de l'API ici
        console.log('Update success:', response);
        window.location.reload();
      },
      (error) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la mise à jour du document :', error);
      }
    );
  }

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
 
  toggleSelection(avis: any) {
    avis.isSelected = !avis.isSelected;
  }
}
