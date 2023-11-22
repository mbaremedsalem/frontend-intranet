import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-agent',
  templateUrl: './confirm-agent.component.html',
  styleUrls: ['./confirm-agent.component.css']
})
export class ConfirmAgentComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmAgentComponent>) {}
  confirmDelete() {
    this.dialogRef.close(true); // Close the dialog and return true to indicate confirmation
  }

  cancelDelete() {
    this.dialogRef.close(false); // Close the dialog and return false to indicate cancellation
  }
}
