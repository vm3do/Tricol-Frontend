import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../../core/services/supplier';
import { Supplier } from '../../../core/models/supplier.model';

@Component({
  selector: 'app-fournisseurs-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './fournisseurs-list.html',
  styleUrl: './fournisseurs-list.css',
})
export class FournisseursListComponent implements OnInit {
  private readonly supplierService = inject(SupplierService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  suppliers: Supplier[] = [];
  loading = false;
  searchKeyword = '';

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    console.log('Loading suppliers...');
    this.loading = true;
    this.cdr.detectChanges();

    this.supplierService.getAll().subscribe({
      next: (response) => {
        console.log('Suppliers loaded:', response);
        this.suppliers = response;
        this.totalElements = response.length;
        this.loading = false;
        console.log('Loading set to false, suppliers count:', this.suppliers.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadSuppliers();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadSuppliers();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/fournisseurs', id]);
  }

  editSupplier(id: number): void {
    this.router.navigate(['/fournisseurs', 'edit', id]);
  }

  deleteSupplier(supplier: Supplier): void {
    if (confirm(`Voulez-vous vraiment supprimer le fournisseur "${supplier.companyName}" ?`)) {
      this.supplierService.delete(supplier.id).subscribe({
        next: () => {
          this.loadSuppliers();
        },
        error: (error) => {
          console.error('Error deleting supplier:', error);
          alert('Erreur lors de la suppression du fournisseur');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getDisplayEnd(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalElements);
  }
}


