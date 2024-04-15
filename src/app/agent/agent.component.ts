import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_BASE_URL, url } from '../base/base_url';
import { DocumentService } from '../document.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmAgentComponent } from '../confirm-agent/confirm-agent.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateAgentComponent } from '../update-agent/update-agent.component';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {

  agents: any[] = [];
  searchTerm: string = ''; // Property to store the search term
  constructor(private agetService: DocumentService,public dialog: MatDialog,private http: HttpClient, private router: Router) { }

  displayedColumns: string[] = ['nom', 'prenom', 'phone', 'email', 'address','post','role','direction_nom','password','is_superuser','is_blocked','is_active','image','actions'];
  dataSource = new MatTableDataSource<any>();
  useTraditionalTable = false;
  my_url!: string ;

  ngOnInit() {
    this.my_url = url;
    this.agetService.getAllAget().subscribe((data: any[]) => {
      this.agents = data;
      this.dataSource.data = this.agents; // Set the data for the Material table
    });
  }

  deleteAgent(documentId: number) {
    const url = `${API_BASE_URL}delete-agent/${documentId}`;

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
        this.deleteAgent(documentId);
        window.location.reload();
      }
    });
  }
  
  openUpdateDialog(agentId: number) {
    const dialogRef = this.dialog.open(UpdateAgentComponent, {
      data: { agentId: agentId },
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.updateAgent(agentId, formData);
      }
    });
  }
  updateAgent(id: number, formData: FormData): void {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
  
    this.http.put(`${API_BASE_URL}update-agent/${id}`, formData, { headers }).subscribe(
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
