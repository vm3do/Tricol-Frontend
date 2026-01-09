import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupplierActions } from '../../store/supplier/supplier.actions';
import { ProductActions } from '../../store/product/product.actions';
import { OrderActions } from '../../store/order/order.actions';
import { StockActions } from '../../store/stock/stock.actions';
import { selectSupplierCount } from '../../store/supplier/supplier.selectors';
import { selectProductCount } from '../../store/product/product.selectors';
import { selectOrderCount, selectPendingOrders } from '../../store/order/order.selectors';
import { selectAlertCount } from '../../store/stock/stock.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, RouterLink, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private readonly store = inject(Store);

  supplierCount$ = this.store.select(selectSupplierCount);
  productCount$ = this.store.select(selectProductCount);
  orderCount$ = this.store.select(selectOrderCount);
  alertCount$ = this.store.select(selectAlertCount);
  pendingOrders$ = this.store.select(selectPendingOrders);

  ngOnInit(): void {
    this.store.dispatch(SupplierActions.loadSuppliers());
    this.store.dispatch(ProductActions.loadProducts());
    this.store.dispatch(OrderActions.loadOrders());
    this.store.dispatch(StockActions.loadSummary());
  }
}
