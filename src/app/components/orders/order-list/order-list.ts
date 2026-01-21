import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderActions } from '../../../store/order/order.actions';
import { selectAllOrders, selectOrderLoading } from '../../../store/order/order.selectors';
import { PermissionService } from '../../../core/services/permission';
import { PERMISSIONS } from '../../../core/models/permission.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-list',
  imports: [AsyncPipe, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly permissionService = inject(PermissionService);

  private readonly orders$ = this.store.select(selectAllOrders);
  orders = toSignal(this.orders$, { initialValue: [] });
  searchQuery = signal('');

  filteredOrders = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.orders();
    return this.orders().filter(o =>
      o.supplier.companyName.toLowerCase().includes(query) ||
      o.status.toLowerCase().includes(query) ||
      o.id.toString().includes(query)
    );
  });

  loading$ = this.store.select(selectOrderLoading);
  P = PERMISSIONS;

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }

  has(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  validateOrder(id: number): void {
    if (confirm('Valider cette commande ?')) {
      this.store.dispatch(OrderActions.validateOrder({ id }));
    }
  }

  receiveOrder(id: number): void {
    if (confirm('Confirmer la réception de cette commande ?')) {
      this.store.dispatch(OrderActions.receiveOrder({ id }));
    }
  }

  cancelOrder(id: number): void {
    if (confirm('Annuler cette commande ?')) {
      this.store.dispatch(OrderActions.cancelOrder({ id }));
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-yellow';
      case 'VALIDATED': return 'badge-blue';
      case 'DELIVERED': return 'badge-green';
      case 'CANCELLED': return 'badge-red';
      default: return 'badge-gray';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'VALIDATED': return 'Validée';
      case 'DELIVERED': return 'Livrée';
      case 'CANCELLED': return 'Annulée';
      default: return status;
    }
  }
}
