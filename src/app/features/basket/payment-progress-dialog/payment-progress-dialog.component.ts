import {Component} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {UikAmModule} from '@visiativ/uik-am';

@Component({
  selector: 'app-payment-progress-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    UikAmModule,
  ],
  templateUrl: './payment-progress-dialog.component.html',
})
export class PaymentProgressDialogComponent {
}

