import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupplierActions } from '../../../store/supplier/supplier.actions';
import { selectAllSuppliers, selectSupplierLoading } from '../../../store/supplier/supplier.selectors';
import { PermissionService } from '../../../core/services/permission';
import { PERMISSIONS } from '../../../core/models/permission.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fournisseurs-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './fournisseurs-list.html',
  styleUrl: './fournisseurs-list.css',
})
export class FournisseursListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly permissionService = inject(PermissionService);

  private readonly suppliers$ = this.store.select(selectAllSuppliers);
  suppliers = toSignal(this.suppliers$, { initialValue: [] });
  searchQuery = signal('');

  filteredSuppliers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.suppliers();
    return this.suppliers().filter(s =>
      s.companyName.toLowerCase().includes(query) ||
      s.contactPerson.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.ice.toLowerCase().includes(query)
    );
  });

  loading$ = this.store.select(selectSupplierLoading);
  P = PERMISSIONS;

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  ngOnInit(): void {
    this.store.dispatch(SupplierActions.loadSuppliers());
  }

  has(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  deleteSupplier(id: number, name: string): void {
    if (confirm(`Voulez-vous vraiment supprimer "${name}" ?`)) {
      this.store.dispatch(SupplierActions.deleteSupplier({ id }));
    }
  }
}
