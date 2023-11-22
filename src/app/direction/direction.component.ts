import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_BASE_URL } from '../base/base_url';
import { DocumentService } from '../document.service';
import { DocumentSelectionService } from '../document-selection.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AddDirectionComponent } from '../add-direction/add-direction.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { ConfirmeDialogDirectionComponent } from '../confirme-dialog-direction/confirme-dialog-direction.component';
import { UpdateDirectionComponent } from '../update-direction/update-direction.component';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent {
  direction: any[] = [];
  useTraditionalTable = false;
  searchTerm: string = ''; // Property to store the search term
  displayedColumns: string[] = ['nom', 'code', 'actions'];

  // Define the MatTableDataSource for the Material table
  dataSource = new MatTableDataSource<any>();

  constructor(private documentService: DocumentService,private documentSelectionService: DocumentSelectionService,public dialog: MatDialog,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.documentService.getDirection().subscribe((data: any[]) => {
      this.direction = data;
      this.dataSource.data = this.direction; // Set the data for the Material table
    });
  }

  openAddDirectionDialog() {
    const dialogRef = this.dialog.open(AddDirectionComponent, {
      width: '400px',
      disableClose: true // To prevent closing by clicking outside the dialog
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle any result or perform actions after the dialog is closed
    });
  }



  deleteDirection(documentId: number) {
    const url = `${API_BASE_URL}delete-direction/${documentId}`;

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
    console.log('Document ID:', documentId); // Ajoutez cette ligne
    const dialogRef = this.dialog.open(ConfirmeDialogDirectionComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.deleteDirection(documentId);
      }
    });
  }
  
  // openUpdateDialog(documentId: number) {
  //   this.documentSelectionService.setSelectedDocumentId(documentId);

  //   // Open the "showupdate-dialog" using MatDialog
  //   const dialogRef = this.dialog.open(UpdateDirectionComponent, {
  //     width: '600px', // Adjust the width as needed
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     // Handle any actions after the dialog is closed (if needed).
  //   });
  // }
//  ++++++++
openUpdateDialog(documentId: number) {
  this.documentSelectionService.setSelectedDocumentId(documentId);
  const dialogRef = this.dialog.open(UpdateDirectionComponent, {
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
      this.updateDirection(documentId, formData);
    }
  });
}

// ------
  updateDirection(id: number, formData: FormData): void {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
  
    this.http.put(`${API_BASE_URL}update-direction/${id}`, formData, { headers }).subscribe(
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
