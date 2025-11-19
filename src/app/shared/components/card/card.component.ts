import {Component, HostBinding, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

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

  onAddToCart() {
    console.log('Add to cart:', this.productId);
  }

  onFavorite() {
    console.log('Favorite:', this.productId);
  }

  onInfo() {
    console.log('Info:', this.productId);
  }

  onMoreOptions() {
    console.log('More options:', this.productId);
  }
}

