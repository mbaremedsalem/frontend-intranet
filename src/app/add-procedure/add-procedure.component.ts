import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentService } from '../document.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { API_BASE_URL } from '../base/base_url';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.css']
})
export class AddProcedureComponent {
  titre: string = '';
  description: string = '';
  selectedFile: File | null = null;
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  loginInProgress = false;
  id!: number;
  agents: any[] = [];
  gerants: any[] = [];
  selectedUserIds: number[] = [];
  directions: any[] = [];
  selectedDirection: any; 
  dataSource = new MatTableDataSource<any>();
  dataSourcegerant = new MatTableDataSource<any>();
  selectAll: boolean = false;

  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private agetService:DocumentService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
  ) {
  }
  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
    this.http.get<any[]>(`${API_BASE_URL}get_all_direction/`,{ headers })
      .subscribe(data => {
        this.directions = data;
      });
    this.agetService.getAllAget().subscribe((data: any[]) => {
      this.agents = data;
      this.dataSource.data = this.agents; // Set the data for the Material table
    });

    this.agetService.getAllgerant().subscribe((data: any[]) => {
      this.gerants = data;
      this.dataSourcegerant.data = this.gerants; // Set the data for the Material table
    });
  }

  onCheckboxChange(id: number) {
    console.log("ID de l'élément sélectionné:", id);

    // Vérifiez si l'ID est déjà dans le tableau
    const index = this.selectedUserIds.indexOf(id);

    // Si l'ID est dans le tableau, retirez-le
    if (index > -1) {
        this.selectedUserIds.splice(index, 1);
    } 
    // Sinon, ajoutez-le au tableau
    else {
        this.selectedUserIds.push(id);
    }

    console.log("IDs sélectionnés:", this.selectedUserIds);
   }

  onSubmit() {

    if (this.titre && this.description&&this.selectedFile) {
      const formData = new FormData();
      formData.append('titre', this.titre);
      formData.append('description', this.description);
      formData.append('admin', localStorage.getItem('id')!);
      this.selectedUserIds.forEach(id => {
        formData.append('user', id.toString()); 
      });
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }      
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.loginInProgress = true; 
      // Make a POST request to your API to create the document
      this.agetService.createProcedur(formData).subscribe(response => {
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


  onSelectAllChange(): void {
    this.selectAll = !this.selectAll;
  }

}
