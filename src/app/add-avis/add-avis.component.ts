import {  Component , ElementRef, ViewChild, inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';
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
  selector: 'app-add-avis',
  templateUrl: './add-avis.component.html',
  styleUrls: ['./add-avis.component.css']
})
export class AddAvisComponent {

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
  // end 
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  usersInDirection: { nom: string, id: number }[] = [];

  // getUsersInDirection
  selectedDirections: { code: string, nom: string, showUsers: boolean, users: any[] }[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);
  // end 
  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private agetService:DocumentService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
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
    this.agetService.getAllAget().subscribe((data: any[]) => {
      this.agents = data;
      this.dataSource.data = this.agents; // Set the data for the Material table
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
        if (this.selectedFile.size > 3 * 1024 * 1024) {
          // Afficher un message d'erreur si la taille du fichier est trop grande
          this.showAlert('error', 'La taille du fichier ne doit pas dépasser 3 MB');
          return; // Sortir de la fonction onSubmit
        }
        formData.append('file', this.selectedFile);
      }     
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.loginInProgress = true; 
      // Make a POST request to your API to create the document
      this.agetService.createAvis(formData).subscribe(response => {
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
  
      // start  
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


      // getUsersInDirection(directionCode: string) {
      //   this.agetService.getUsersInDirection(directionCode).subscribe(
      //     response => {
      //       this.usersInDirection = response.users_in_direction;
      //       console.log('----',this.usersInDirection)
      //     },
      //     error => {
      //       console.error('Error fetching users:', error);
      //     }
      //   );
      // }
   


toggleDirectionSelection(directionCode: string) {
  const index = this.selectedDirections.findIndex(dir => dir.code === directionCode);

  if (index === -1) {
    // Si la direction n'est pas déjà sélectionnée, ajoutez-la à la liste des directions sélectionnées
    this.getUsersInDirection(directionCode);
  } else {
    // Si la direction est déjà sélectionnée, supprimez-la de la liste des directions sélectionnées
    this.selectedDirections.splice(index, 1);
  }
}

getUsersInDirection(directionCode: string) {
  this.agetService.getUsersInDirection(directionCode).subscribe(
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
