import {Component, HostBinding, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import {CartService} from '../../shared/services/cart.service';
import {CartItem} from '../../interfaces/cart-item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PageLayoutComponent,
  ],
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  @HostBinding('class') class = 'app-basket';

  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  get cartItems(): CartItem[] {
    return this.cartService.items;
  }

  get hasItems(): boolean {
    return this.cartItems.length > 0;
  }

  updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.product.id);
  }

  placeOrder(): void {
    this.router.navigate(['/checkout']);
  }

  getImageUrl(imagePath: string): string {
    return `${imagePath}`;
  }
}

