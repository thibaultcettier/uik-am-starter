import {Component, HostBinding, Input, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {Product} from '../../../interfaces/IProduct';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
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
    console.log('Info:', this.productId);
  }

  onMoreOptions(event: MouseEvent) {
    event.stopPropagation();
    console.log('More options:', this.productId);
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

