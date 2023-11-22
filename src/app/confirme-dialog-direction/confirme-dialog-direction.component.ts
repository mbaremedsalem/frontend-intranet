import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirme-dialog-direction',
  templateUrl: './confirme-dialog-direction.component.html',
  styleUrls: ['./confirme-dialog-direction.component.css']
})
export class ConfirmeDialogDirectionComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmeDialogDirectionComponent>) {}
  confirmDelete() {
    this.dialogRef.close(true); // Close the dialog and return true to indicate confirmation
  }

  cancelDelete() {
    this.dialogRef.close(false); // Close the dialog and return false to indicate cancellation
  }
}
