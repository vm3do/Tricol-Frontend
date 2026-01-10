import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SupplierActions } from '../../../store/supplier/supplier.actions';
import { selectSupplierLoading, selectSupplierError } from '../../../store/supplier/supplier.selectors';
import { SupplierService } from '../../../core/services/supplier';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-fournisseurs-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './fournisseurs-form.html',
  styleUrl: './fournisseurs-form.css',
})
export class FournisseursFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly supplierService = inject(SupplierService);

  supplierForm!: FormGroup;
  loading$ = this.store.select(selectSupplierLoading);
  error$ = this.store.select(selectSupplierError);
  isEditMode = false;
  supplierId?: number;

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      contactPerson: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+212|0)[5-7]\d{8}$/)]],
      ice: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.supplierId = Number(id);
      this.supplierService.getById(this.supplierId).subscribe((supplier) => {
        this.supplierForm.patchValue(supplier);
      });
    }
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      Object.keys(this.supplierForm.controls).forEach((key) => {
        this.supplierForm.get(key)?.markAsTouched();
      });
      return;
    }

    if (this.isEditMode && this.supplierId) {
      this.store.dispatch(
        SupplierActions.updateSupplier({ id: this.supplierId, supplier: { id: this.supplierId, ...this.supplierForm.value } })
      );
    } else {
      this.store.dispatch(SupplierActions.createSupplier({ supplier: this.supplierForm.value }));
    }
  }

  goBack(): void {
    this.router.navigate(['/fournisseurs']);
  }

  get companyName() { return this.supplierForm.get('companyName'); }
  get address() { return this.supplierForm.get('address'); }
  get city() { return this.supplierForm.get('city'); }
  get contactPerson() { return this.supplierForm.get('contactPerson'); }
  get email() { return this.supplierForm.get('email'); }
  get phone() { return this.supplierForm.get('phone'); }
  get ice() { return this.supplierForm.get('ice'); }
}
