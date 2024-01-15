import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentService } from '../document.service';
import { DocumentSelectionService } from '../document-selection.service';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { API_BASE_URL } from '../base/base_url';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-desision',
  templateUrl: './desision.component.html',
  styleUrls: ['./desision.component.css']
})
export class DesisionComponent {
  decisions: any[] = [];
  useTraditionalTable = false;

  displayedColumns: string[] = ['sujet', 'code', 'description', 'file', 'direction_nom','date_ajout','actions'];

  // Define the MatTableDataSource for the Material table
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  filteredDocuments: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private documentService: DocumentService,private documentSelectionService: DocumentSelectionService,public dialog: MatDialog,private sanitizer: DomSanitizer,private http: HttpClient, private router: Router) { }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
  
    this.documentService.getAllNotes(page, pageSize).subscribe((data: any[]) => {
      this.decisions = data;
      this.dataSource.data = this.decisions;
  
      // Désinfecter les URLs
      this.decisions.forEach(decision => {
        decision.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${decision.file}`);
      });
    });
  }
  ngOnInit(): void {
    const page = 1;        // Commencez par la première page
    const pageSize = 3;    // Nombre d'éléments par page
  
    this.documentService.getAllDecision(page, pageSize).subscribe((data: any[]) => {
      this.decisions = data;
      this.dataSource.data = this.decisions;
  
      // Désinfecter les URLs
      this.decisions.forEach(decision => {
        decision.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${decision.file}`);
      });
    });
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



  deleteDocument(decisionId: number) {
    const url = `${API_BASE_URL}delete-decision/${decisionId}`;

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


  
  openConfirmationDialog(noteId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.deleteDocument(noteId);
      }
    });
  }
  


  // -------
  openUpdateDialog(decisionId: number) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { decisionId: decisionId },
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.updateDocument(decisionId, formData);
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
 
  toggleSelection(decision: any) {
    decision.isSelected = !decision.isSelected;
  }
}
