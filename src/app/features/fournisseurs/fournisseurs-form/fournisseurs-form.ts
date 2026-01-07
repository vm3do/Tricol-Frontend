import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../core/services/supplier';

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
  loading = signal(false);
  isEditMode = signal(false);
  supplierId?: number;
  errorMessage = signal('');

  ngOnInit(): void {
    this.initForm();

    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.supplierId) {
      this.isEditMode.set(true);
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
    this.loading.set(true);
    this.supplierService.getById(id).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue(supplier);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading supplier:', error);
        this.errorMessage.set('Erreur lors du chargement du fournisseur');
        this.loading.set(false);
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

    this.loading.set(true);
    this.errorMessage.set('');

    const supplierData = this.supplierForm.value;

    const request = this.isEditMode() && this.supplierId
      ? this.supplierService.update(this.supplierId, { id: this.supplierId, ...supplierData })
      : this.supplierService.create(supplierData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/fournisseurs']);
      },
      error: (error) => {
        console.error('Error saving supplier:', error);
        let message = 'Erreur lors de l\'enregistrement du fournisseur';

        if (error.status === 409) {
          message = 'Un fournisseur avec cet ICE existe déjà';
        } else if (error.error?.message) {
          message = error.error.message;
        }

        this.errorMessage.set(message);
        this.loading.set(false);
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
