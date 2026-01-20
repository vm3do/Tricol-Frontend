import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductActions } from '../../../store/product/product.actions';
import { selectAllProducts, selectProductLoading } from '../../../store/product/product.selectors';
import { PermissionService } from '../../../core/services/permission';
import { PERMISSIONS } from '../../../core/models/permission.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, RouterLink, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly permissionService = inject(PermissionService);

  private readonly products$ = this.store.select(selectAllProducts);
  products = toSignal(this.products$, { initialValue: [] });
  searchQuery = signal('');

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.products();
    return this.products().filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.reference.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  });

  loading$ = this.store.select(selectProductLoading);
  P = PERMISSIONS;

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  has(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  deleteProduct(id: number, name: string): void {
    if (confirm(`Voulez-vous vraiment supprimer "${name}" ?`)) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
    }
  }
}
