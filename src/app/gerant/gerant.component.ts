import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../base/base_url';

import { UpdateGerantComponent } from '../update-gerant/update-gerant.component';
import { ConfirmAgentComponent } from '../confirm-agent/confirm-agent.component';

@Component({
  selector: 'app-gerant',
  templateUrl: './gerant.component.html',
  styleUrls: ['./gerant.component.css']
})
export class GerantComponent {
  
  gerants: any[] = [];
  constructor(private agetService: DocumentService,public dialog: MatDialog,private http: HttpClient, private router: Router) { }
  searchTerm: string = ''; // Property to store the search term
  displayedColumns: string[] = ['nom', 'prenom', 'phone', 'email', 'address','post','role','password','is_superuser','is_blocked','is_active','image','actions'];
  dataSource = new MatTableDataSource<any>();
  useTraditionalTable = false;
  ngOnInit() {
    this.agetService.getAllgerant().subscribe((data: any[]) => {
      this.gerants = data;
      this.dataSource.data = this.gerants; // Set the data for the Material table
    });
  }

  deletegerant(documentId: number) {
    const url = `${API_BASE_URL}delete-gerant/${documentId}`;

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
    const dialogRef = this.dialog.open(ConfirmAgentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.deletegerant(documentId);
        window.location.reload();
      }
    });
  }
  
  openUpdateDialog(gerantId: number) {
    console.log(gerantId);
    const dialogRef = this.dialog.open(UpdateGerantComponent, {
      data: { gerantId: gerantId },
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
    });
  
    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.updateGerant(gerantId, formData);
      }
    });
  }
  updateGerant(id: number, formData: FormData): void {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
  
    this.http.put(`${API_BASE_URL}update-gerant/${id}`, formData, { headers }).subscribe(
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
