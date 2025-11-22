import {Injectable, computed, signal} from '@angular/core';
import {Product} from '../../interfaces/IProduct';
import {CartItem} from '../../interfaces/cart-item';

@Injectable({providedIn: 'root'})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);

  readonly totalCount = computed(() =>
    this.itemsSignal().reduce((total, item) => total + item.quantity, 0)
  );

  get items(): CartItem[] {
    return this.itemsSignal();
  }

  addItem(product: Product, quantity: number = 1): void {
    if (!product) {
      return;
    }
    const qty = Math.max(1, quantity);
    this.itemsSignal.update(items => {
      const index = items.findIndex(item => item.product.id === product.id);
      if (index !== -1) {
        const updated = [...items];
        const current = updated[index];
        updated[index] = {...current, quantity: current.quantity + qty};
        return updated;
      }
      return [...items, {product, quantity: qty}];
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.itemsSignal.update(items =>
      items.map(item =>
        item.product.id === productId
          ? {...item, quantity}
          : item
      )
    );
  }

  removeItem(productId: number): void {
    this.itemsSignal.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}

