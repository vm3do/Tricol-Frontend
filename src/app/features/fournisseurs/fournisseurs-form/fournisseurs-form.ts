import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier';
import { Supplier } from '../../../core/models/supplier.model';

@Component({
  selector: 'app-fournisseurs-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fournisseurs-form.html',
  styleUrl: './fournisseurs-form.css',
})
export class FournisseursFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly supplierService = inject(SupplierService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  supplierForm!: FormGroup;
  loading = false;
  isEditMode = false;
  supplierId?: number;
  errorMessage = '';

  ngOnInit(): void {
    this.initForm();

    // Check if we're in edit mode
    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.supplierId) {
      this.isEditMode = true;
      this.loadSupplier(this.supplierId);
    }
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      ice: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadSupplier(id: number): void {
    this.loading = true;
    this.supplierService.getById(id).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue(supplier);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading supplier:', error);
        this.errorMessage = 'Erreur lors du chargement du fournisseur';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      Object.keys(this.supplierForm.controls).forEach(key => {
        this.supplierForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const supplierData = this.supplierForm.value;

    const request = this.isEditMode && this.supplierId
      ? this.supplierService.update(this.supplierId, { id: this.supplierId, ...supplierData })
      : this.supplierService.create(supplierData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/fournisseurs']);
      },
      error: (error) => {
        console.error('Error saving supplier:', error);
        if (error.status === 409) {
          this.errorMessage = 'Un fournisseur avec cet ICE existe déjà';
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Erreur lors de l\'enregistrement du fournisseur';
        }
        this.loading = false;
      }
    });
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
