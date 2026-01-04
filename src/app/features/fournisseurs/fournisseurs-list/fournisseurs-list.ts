import {Component, inject, OnInit, Output, signal} from '@angular/core';
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

  suppliers = signal<Supplier[]>([]);
  loading = signal(false);
  searchKeyword = '';
  totalElements = signal(0);

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading.set(true);

    this.supplierService.getAll().subscribe({
      next: (response) => {
        this.suppliers.set(response);
        this.totalElements.set(response.length);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
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
}


