import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../base/base_url';
import { AddProcedureComponent } from '../add-procedure/add-procedure.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-procedur',
  templateUrl: './procedur.component.html',
  styleUrls: ['./procedur.component.css']
})
export class ProcedurComponent {
  ProcedureList: any[] = [
    {  isSelected: false },
  ];
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  constructor(private documentService: DocumentService,private sanitizer: DomSanitizer,public dialog: MatDialog,private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    // this.fetchProcedur();
    this.documentService.getAllProcedure().subscribe((data: any[]) => {
      this.ProcedureList = data;
      this.dataSource.data = this.ProcedureList; // Set the data for the Material table
      // Désinfecter les URLs
      this.ProcedureList.forEach(pro => {
        pro.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${pro.file}`);
      });
    });
  }


  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(AddProcedureComponent, {
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

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
}
