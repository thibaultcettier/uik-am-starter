import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-payment-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './payment-confirmation-dialog.component.html',
})
export class PaymentConfirmationDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PaymentConfirmationDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}

