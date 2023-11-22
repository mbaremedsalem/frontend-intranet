import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../document.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../base/base_url';

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.css']
})
export class AddDocumentDialogComponent {
  sujet: string = '';

  description: string = '';
  selectedFile: File | null = null;
  directions: any[] = [];
  direction_nom: string = '';
  selectedDirection: any; 
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  loginInProgress = false;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
    this.http.get<any[]>(`${API_BASE_URL}get_all_direction/`,{ headers })
      .subscribe(data => {
        this.directions = data;
      });
    
  }


  onSubmit() {

    if (this.sujet && this.description&&this.selectedDirection) {
      const formData = new FormData();
      formData.append('sujet', this.sujet);
      formData.append('description', this.description);
      formData.append('selectedDirection', this.selectedDirection.id.toString());
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      this.loginInProgress = true; 
      // Make a POST request to your API to create the document
      this.documentService.createDocument(formData).subscribe(response => {
        console.log('Response:', response);
        
        this.message = response.message;
          if (this.message) {
            this.showErrorAlert(this.message);
          }

        this.dialogRef.close();
        window.location.reload();
      }).add(() => {
        this.loginInProgress = false; // Set to false after login completes (whether success or error)
      });
    }
  }

  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }
  onCancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
