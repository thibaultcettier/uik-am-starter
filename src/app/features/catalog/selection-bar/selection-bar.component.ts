import {Component, HostBinding, Input, Output, EventEmitter} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-selection-bar',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './selection-bar.component.html'
})
export class SelectionBarComponent {
  @HostBinding('class') class = 'app-selection-bar';

  @Input() selectedCount: number = 0;
  @Output() clearSelection = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() addToFavorite = new EventEmitter<void>();

  onClearSelection() {
    this.clearSelection.emit();
  }

  onAddToCart() {
    this.addToCart.emit();
  }

  onAddToFavorite() {
    this.addToFavorite.emit();
  }
}

