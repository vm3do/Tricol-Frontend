import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ProductActions } from '../../../store/product/product.actions';
import { selectProductLoading, selectProductError } from '../../../store/product/product.selectors';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  productForm!: FormGroup;
  loading$ = this.store.select(selectProductLoading);
  error$ = this.store.select(selectProductError);
  isEditMode = false;
  productId?: number;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      reference: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unitPrice: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]],
      reorderPoint: [null, [Validators.required, Validators.min(0)]],
      unit: ['', [Validators.required]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = Number(id);
      this.productService.getById(this.productId).subscribe((p) => this.productForm.patchValue(p));
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach((k) => this.productForm.get(k)?.markAsTouched());
      return;
    }
    if (this.isEditMode && this.productId) {
      this.store.dispatch(ProductActions.updateProduct({ id: this.productId, product: this.productForm.value }));
    } else {
      this.store.dispatch(ProductActions.createProduct({ product: this.productForm.value }));
    }
  }

  goBack(): void { this.router.navigate(['/products']); }
}
