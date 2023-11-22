import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentSelectionService } from '../document-selection.service';

@Component({
  selector: 'app-update-direction',
  templateUrl: './update-direction.component.html',
  styleUrls: ['./update-direction.component.css']
})
export class UpdateDirectionComponent {

  roles: any[] = []; 
  directionData: any;
  directionDetails: any; 
  isEditMode = false;

  constructor(private _formBuilder: FormBuilder,
    private apiService:DocumentService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<UpdateDirectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { documentId: number },
    private documentSelectionService: DocumentSelectionService,
  ) {
  }
  

  ngOnInit() {
    this.getdirectionDetails(this.data.documentId);
  }

  getdirectionDetails(documentId: number): void {
    
    this.apiService.getDirectionById(documentId, ).subscribe((data) => {
      this.directionDetails = data;
      
    });
    
  }

  enableEditMode() {
    this.isEditMode = true;
  }


  
  saveChanges() {
    const formData: FormData = new FormData();
       
    formData.append('nom', this.directionDetails.nom);
    formData.append('code', this.directionDetails.code);
  
    formData.append('direction_nom', this.directionDetails.direction_nom);

  
    // Vous pouvez maintenant envoyer formData à la méthode close
    this.dialogRef.close(formData);
  }
}
