import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true); // Close the dialog and return true to indicate confirmation
  }

  cancelDelete() {
    this.dialogRef.close(false); // Close the dialog and return false to indicate cancellation
  }
}
