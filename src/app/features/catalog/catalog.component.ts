import {Component, HostBinding, inject, OnDestroy, OnInit} from '@angular/core';
import {UikAmModule} from "@visiativ/uik-am";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {PageLayoutComponent} from '../../layout/page-layout/page-layout.component';
import {CardComponent} from '../../shared/components/card/card.component';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Product} from '../../interfaces/IProduct';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  imports: [
    UikAmModule,
    MatButtonModule,
    MatCardModule,
    PageLayoutComponent,
    CardComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonToggleModule,
  ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-catalog';

  private readonly http = inject(HttpClient);
  private readonly destroy$ = new Subject<void>();

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  products: Product[] = [];
  loading = true;
  totalItems = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 20, 30];
  searchControl = new FormControl('', {nonNullable: true});
  readonly skeletonPlaceholders = Array.from({length: 10}, (_, index) => index);

  ngOnInit() {
    this.setupSearchListener();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSearchListener() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.pageIndex = 0;
        this.applyFilters(value);
      });
  }

  loadProducts() {
    this.loading = true;
    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => {
        this.allProducts = products ?? [];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.allProducts = [];
        this.filteredProducts = [];
        this.products = [];
        this.totalItems = 0;
        this.loading = false;
      }
    });
  }

  applyFilters(searchTerm: string = this.searchControl.value) {
    const term = (searchTerm ?? '').trim().toLowerCase();
    if (term) {
      this.filteredProducts = this.allProducts.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(term);
        const brandMatch = product.brand?.toLowerCase().includes(term);
        const categoryMatch = product.category?.toLowerCase().includes(term);
        const idMatch = product.id?.toString().includes(term);
        return Boolean(nameMatch || brandMatch || categoryMatch || idMatch);
      });
    } else {
      this.filteredProducts = [...this.allProducts];
    }

    this.totalItems = this.filteredProducts.length;
    // Ensure current page index is valid
    const maxPageIndex = Math.max(Math.ceil(this.totalItems / this.pageSize) - 1, 0);
    this.pageIndex = Math.min(this.pageIndex, maxPageIndex);
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.products = this.filteredProducts.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedProducts();
  }

  getImageUrl(imagePath: string): string {
    return `/api${imagePath}`;
  }
}
