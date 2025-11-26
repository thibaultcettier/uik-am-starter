import {Component, HostBinding, Input, Output, EventEmitter, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule, MatCheckboxChange} from '@angular/material/checkbox';
import {Product} from '../../../interfaces/IProduct';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  templateUrl: './card.component.html'
})
export class CardComponent {
  @HostBinding('class') class = 'app-card';

  @Input() title: string = '';
  @Input() productId: string = '';
  @Input() imageUrl: string = '';
  @Input() showDemoOverlay: boolean = false;
  @Input() product?: Product;
  @Input() isSelected: boolean = false;

  @Output() selectProduct = new EventEmitter<void>();
  @Output() openDetails = new EventEmitter<void>();

  private readonly cartService = inject(CartService);

  onAddToCart(event: MouseEvent) {
    event.stopPropagation();
    const product = this.ensureProduct();
    this.cartService.addItem(product, 1);
  }

  onFavorite(event: MouseEvent) {
    event.stopPropagation();
    console.log('Favorite:', this.productId);
  }

  onInfo(event: MouseEvent) {
    event.stopPropagation();
    this.openDetails.emit();
  }

  onMoreOptions(event: MouseEvent) {
    event.stopPropagation();
    // Menu will be handled by mat-menu
  }

  onSelectThisProduct(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.selectProduct.emit();
  }

  onOpenDetails(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.openDetails.emit();
  }

  onCheckboxChange(event: MatCheckboxChange) {
    this.selectProduct.emit();
  }

  private ensureProduct(): Product {
    if (this.product) {
      return this.product;
    }
    return {
      id: Number(this.productId),
      name: this.title,
      image: this.imageUrl,
      price: 0,
      currency: 'EUR'
    };
  }
}

