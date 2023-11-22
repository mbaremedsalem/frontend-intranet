import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentService } from '../document.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentSelectionService } from '../document-selection.service';

@Component({
  selector: 'app-update-gerant',
  templateUrl: './update-gerant.component.html',
  styleUrls: ['./update-gerant.component.css']
})
export class UpdateGerantComponent {
  selectedFile: File | null = null;

  directions: any[] = []; 
  selectedDirection: number |null =null;
  selectedRole: number |null =null;
  roles: any[] = []; 

  isEditMode = false;
  gerantDetails: any; 
  toppings = this._formBuilder.group({
    is_superuser: false,
    is_active: false,
    is_blocked: false,
  });
  constructor(private _formBuilder: FormBuilder,
    private apiService:DocumentService,
    private dialogRef: MatDialogRef<UpdateGerantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { gerantId: number },
  ) {}
  
  ngOnInit() {
    console.log(this.data.gerantId)
    this.getGerantDetails(this.data.gerantId);

    this.apiService.getDirection().subscribe((data: any[]) => {
      this.directions = data;
    });

    this.apiService.getRoles().subscribe((data: any[]) => {
      this.roles = data;
    });

  }
  getGerantDetails(gerantId: number): void {
    
    this.apiService.getGerantById(gerantId).subscribe((data) => {
      this.gerantDetails = data;
      this.toppings.patchValue({
        is_superuser: this.gerantDetails.is_superuser,
        is_active: this.gerantDetails.is_active,
        is_blocked: this.gerantDetails.is_blocked,
      });
    });
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
  
  saveChanges() {
    const formData: FormData = new FormData();
  
    const isSuperuser = this.toppings.get('is_superuser')?.value;
    const isActive = this.toppings.get('is_active')?.value;
    const isBlocked = this.toppings.get('is_blocked')?.value;
  
    // Convertir les valeurs en chaînes si nécessaire
    const isSuperuserString = isSuperuser ? 'true' : 'false';
    const isActiveString = isActive ? 'true' : 'false';
    const isBlockedString = isBlocked ? 'true' : 'false';
    formData.append('nom', this.gerantDetails.nom);
    formData.append('prenom', this.gerantDetails.prenom);
    formData.append('phone', this.gerantDetails.phone);
    formData.append('email', this.gerantDetails.email);
    formData.append('post', this.gerantDetails.post);
    formData.append('role', this.gerantDetails.role);
    formData.append('direction_nom', this.gerantDetails.direction_nom);
    formData.append('password', this.gerantDetails.password);
    formData.append('address', this.gerantDetails.adress);
    formData.append('is_active', isActiveString);
    formData.append('is_superuser', isSuperuserString);
    formData.append('is_blocked', isBlockedString);
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    // Vous pouvez maintenant envoyer formData à la méthode close
    this.dialogRef.close(formData);
  }
}
