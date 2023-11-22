import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-add-direction',
  templateUrl: './add-direction.component.html',
  styleUrls: ['./add-direction.component.css']
})
export class AddDirectionComponent {
  nom: string = '';
  code: string = '';
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  loginInProgress = false;

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    private documentService: DocumentService
  ) {}

  
  onSubmit() {
   
    if (this.nom && this.code ) {
      const formData = new FormData();
      formData.append('nom', this.nom);
      formData.append('code', this.code);
      this.loginInProgress = true;

      // Make a POST request to your API to create the document
      this.documentService.createDirection(formData).subscribe(response => {
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

}
