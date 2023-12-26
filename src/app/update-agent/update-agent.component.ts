import { Component, Inject } from '@angular/core';
import { DocumentSelectionService } from '../document-selection.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css'],
  
})
export class UpdateAgentComponent {
  selectedFile: File | null = null;
  directions: any[] = []; 
  selectedDirection: number |null =null;
  selectedRole: number |null =null;
  roles: any[] = []; 
  agentData: any;
  agentDetails: any; 
  isEditMode = false;
  toppings = this._formBuilder.group({
    is_superuser: false,
    is_active: false,
    is_blocked: false,
  });
  
  constructor(private _formBuilder: FormBuilder,
    private apiService:DocumentService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<UpdateAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { agentId: number },
    private documentSelectionService: DocumentSelectionService,
  ) {
  }
  

  ngOnInit() {
    this.getAgentDetails(this.data.agentId);

    this.apiService.getDirection().subscribe((data: any[]) => {
      this.directions = data;
    });

    this.apiService.getRoles().subscribe((data: any[]) => {
      this.roles = data;
    });


  }
  getAgentDetails(agentId: number): void {
    
    this.apiService.getAgentById(agentId, ).subscribe((data) => {
      this.agentDetails = data;
      this.toppings.patchValue({
        is_superuser: this.agentDetails.is_superuser,
        is_active: this.agentDetails.is_active,
        is_blocked: this.agentDetails.is_blocked,
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
    formData.append('nom', this.agentDetails.nom);
    formData.append('prenom', this.agentDetails.prenom);
    formData.append('phone', this.agentDetails.phone);
    formData.append('email', this.agentDetails.email);
    formData.append('post', this.agentDetails.post);
    formData.append('role', this.agentDetails.role);
    formData.append('direction_nom', this.agentDetails.direction_nom);
    formData.append('password', this.agentDetails.password);
    formData.append('address', this.agentDetails.adress);
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
