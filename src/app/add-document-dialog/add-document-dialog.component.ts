import {  Component , ElementRef, ViewChild, inject} from '@angular/core';
import { DocumentService } from '../document.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
// import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../base/base_url';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';

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
  selectAll: boolean = false;
  selectedUserIds: number[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  usersInDirection: { nom: string, id: number }[] = [];
  selectedDirections: { code: string, nom: string, showUsers: boolean, users: any[] }[] = [];
  // getUsersInDirection

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  
  announcer = inject(LiveAnnouncer);

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    private documentService: DocumentService
  ) {

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.directions.slice())),
    );
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
    this.http.get<any[]>(`${API_BASE_URL}get_all_direction/`,{ headers })
      .subscribe(data => {
        this.directions = data;
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

    if (this.sujet && this.description) {
      const formData = new FormData();
      formData.append('titre', this.sujet);
      formData.append('description', this.description);
      // formData.append('selectedDirection', this.selectedDirection.id.toString());
      // formData.append('selectedDirection', this.selectedDirection.id.toString());
      this.selectedUserIds.forEach(id => {
        formData.append('user', id.toString()); 
      });
      if (this.selectedFile) {
        if (this.selectedFile.size > 3 * 1024 * 1024) {
          // Afficher un message d'erreur si la taille du fichier est trop grande
          this.showAlert('error', 'La taille du fichier ne doit pas dépasser 3 MB');
          return; // Sortir de la fonction onSubmit
        }
        formData.append('file', this.selectedFile);
      }
      formData.append('admin', localStorage.getItem('id')!);
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
  showAlert(type: string, message: string) {
    // Customize this function to display the alert as per your design
    // For example, using a library like Angular Material Snackbar
    // or Bootstrap alert
    alert(type + ': ' + message);
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

  track(index: number, item: any): any {
    return index; // or unique identifier of the item if available
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.directions.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(direction: string): void {
    const index = this.directions.indexOf(direction);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${direction}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.directions.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.directions.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  // end 

  getUsersInDirection(directionCode: string) {
    this.documentService.getUsersInDirection(directionCode).subscribe(
      response => {
        this.selectedDirections.push({
          code: directionCode,
          nom: this.directions.find(dir => dir.code === directionCode)?.nom || '',
          showUsers: true,
          users: response.users_in_direction
        });
        
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
