import {Component, HostBinding, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {PageLayoutComponent} from '../../../layout/page-layout/page-layout.component';
import {MatDialog} from '@angular/material/dialog';
import {PaymentProgressDialogComponent} from '../payment-progress-dialog/payment-progress-dialog.component';
import {PaymentConfirmationDialogComponent} from '../payment-confirmation-dialog/payment-confirmation-dialog.component';
import {CartService} from '../../../shared/services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    PageLayoutComponent,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  @HostBinding('class') class = 'app-checkout';

  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  checkoutForm: FormGroup = this.fb.group({
    // Name section
    fullName: ['', [Validators.required]],
    phoneNumber: ['', []],
    email: ['', [Validators.required, Validators.email]],
    // Delivery Address section
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    // Payment section
    cardNumber: ['', [Validators.required]],
    cardExpiry: ['', [Validators.required]],
    cardCvv: ['', [Validators.required]],
    cardName: ['', [Validators.required]],
  });

  submitPayment(): void {
    if (this.checkoutForm.valid) {
      // Open progress dialog
      const progressDialog = this.dialog.open(PaymentProgressDialogComponent, {
        disableClose: true,
        panelClass: 'app-payment-progress-dialog',
      });

      // Simulate payment processing (2 seconds)
      setTimeout(() => {
        progressDialog.close();

        // Open confirmation dialog
        const confirmationDialog = this.dialog.open(PaymentConfirmationDialogComponent, {
          disableClose: true,
          panelClass: 'app-payment-confirmation-dialog',
        });

        confirmationDialog.afterClosed().subscribe(() => {
          // Clear cart and redirect to home
          this.cartService.clear();
          this.router.navigate(['/home']);
        });
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
    }
  }
}

