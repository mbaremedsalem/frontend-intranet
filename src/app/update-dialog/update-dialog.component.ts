import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../document.service';
import { DocumentSelectionService } from '../document-selection.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  selectedFile: File | null = null;
  documentDetails: any ;
  isEditMode = false;
  directions: any[] = []; 
  selectedDirection: number |null =null;
  minDate: Date|null =null;;
  maxDate: Date|null =null;;
  constructor(
    private _formBuilder: FormBuilder,
    private apiService:DocumentService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { documentId: number },
    private documentSelectionService: DocumentSelectionService,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
   
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.getDocumentDetails(this.data.documentId);
    this.apiService.getDirection().subscribe((data: any[]) => {
      this.directions = data;
    });

  }

    getDocumentDetails(documentId: number): void {
    
    this.apiService.getDocumentById(documentId, ).subscribe((data) => {
      this.documentDetails = data;
      
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
  
    // Function to handle date change events
  dateChanged(event: MatDatepickerInputEvent<Date>): void {
      console.log('Date changed:', event.value);
      // Do something with the selected date if needed
    }
  saveChanges() {
    const formData: FormData = new FormData();
  
    formData.append('sujet', this.documentDetails.sujet);
    formData.append('description', this.documentDetails.description);
    formData.append('date_ajout', this.documentDetails.date_ajout);
    formData.append('direction_nom', this.documentDetails.direction_nom);
    
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
  
    // Vous pouvez maintenant envoyer formData à la méthode close
    this.dialogRef.close(formData);
  }
  
}
