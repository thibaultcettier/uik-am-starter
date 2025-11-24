import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NgIf, NgFor, CurrencyPipe, TitleCasePipe, NgClass} from '@angular/common';
import {Product} from '../../../interfaces/IProduct';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {CartService} from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    NgIf,
    NgFor,
    CurrencyPipe,
    TitleCasePipe,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './product-detail-dialog.component.html'
})
export class ProductDetailDialogComponent {
  quantityControl = new FormControl(1, {nonNullable: true});
  private readonly cartService = inject(CartService);

  constructor(
    private readonly dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addToCart(): void {
    const quantity = this.quantityControl.value ?? 1;
    this.cartService.addItem(this.product, quantity);
  }
}

