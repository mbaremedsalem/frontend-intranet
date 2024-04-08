import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL, url } from '../base/base_url';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DocumentSelectionService } from '../document-selection.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit{
  documents: any[] = [];
  useTraditionalTable = false;
  my_url!: string ;
  displayedColumns: string[] = ['sujet', 'code', 'description', 'file', 'direction_nom','date_ajout','actions'];
  isAdmin: boolean = false;
  // Define the MatTableDataSource for the Material table
  dataSource = new MatTableDataSource<any>();

  searchTerm: string = ''; // Property to store the search term
  constructor(private documentService: DocumentService,private documentSelectionService: DocumentSelectionService,public dialog: MatDialog,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.my_url = url;
    const role = window.localStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.documentService.getDocuments().subscribe((data) => {
      this.documents = data;
      this.dataSource.data = this.documents; // Set the data for the Material table
    });
  }

  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '400px',
      disableClose: true // To prevent closing by clicking outside the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any result or perform actions after the dialog is closed
    });
  }



  deleteDocument(documentId: number) {
    const url = `${API_BASE_URL}delete-document/${documentId}`;

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
      (error) => {
        console.error('Error deleting document:', error);
        // Handle the error, display a message, etc.
      }
    );
  }

  openConfirmationDialog(documentId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.deleteDocument(documentId);
      }
    });
  }
  
  openUpdateDialog(documentId: number) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
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
  
}
