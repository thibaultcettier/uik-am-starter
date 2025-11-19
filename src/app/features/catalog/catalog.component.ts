import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {UikAmModule} from "@visiativ/uik-am";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import {CardComponent} from '../../shared/components/card/card.component';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { Product } from '../../interfaces/IProduct';

@Component({
  selector: 'app-catalog',
  imports: [
    UikAmModule,
    MatButtonModule,
    MatCardModule,
    PageLayoutComponent,
    CardComponent,
    CommonModule,
  ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  @HostBinding('class') class = 'app-catalog';

  private readonly http = inject(HttpClient);
  products: Product[] = [];
  loading = true;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  getImageUrl(imagePath: string): string {
    return `/api${imagePath}`;
  }
}
