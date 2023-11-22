import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-gerant',
  templateUrl: './confirm-gerant.component.html',
  styleUrls: ['./confirm-gerant.component.css']
})
export class ConfirmGerantComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmGerantComponent>) {}
  confirmDelete() {
    this.dialogRef.close(true); // Close the dialog and return true to indicate confirmation
  }

  cancelDelete() {
    this.dialogRef.close(false); // Close the dialog and return false to indicate cancellation
  }
}
