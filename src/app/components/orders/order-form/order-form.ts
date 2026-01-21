import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { OrderActions } from '../../../store/order/order.actions';
import { SupplierActions } from '../../../store/supplier/supplier.actions';
import { ProductActions } from '../../../store/product/product.actions';
import { selectAllSuppliers } from '../../../store/supplier/supplier.selectors';
import { selectAllProducts } from '../../../store/product/product.selectors';
import { selectOrderLoading, selectOrderError } from '../../../store/order/order.selectors';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
})
export class OrderFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  orderForm!: FormGroup;
  suppliers$ = this.store.select(selectAllSuppliers);
  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectOrderLoading);
  error$ = this.store.select(selectOrderError);

  ngOnInit(): void {
    this.store.dispatch(SupplierActions.loadSuppliers());
    this.store.dispatch(ProductActions.loadProducts());

    this.orderForm = this.fb.group({
      supplierId: [null, [Validators.required]],
      orderDate: ['', [Validators.required]],
      items: this.fb.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;
    this.store.dispatch(OrderActions.createOrder({ order: this.orderForm.value }));
  }

  goBack(): void { this.router.navigate(['/orders']); }
}
