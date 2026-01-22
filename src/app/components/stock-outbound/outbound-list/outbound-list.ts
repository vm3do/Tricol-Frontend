import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StockService } from '../../../core/services/stock';
import { StockOutbound } from '../../../core/models/stock.model';
import { PermissionService } from '../../../core/services/permission';
import { PERMISSIONS } from '../../../core/models/permission.model';

@Component({
  selector: 'app-outbound-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './outbound-list.html',
  styleUrl: './outbound-list.css',
})
export class OutboundListComponent implements OnInit {
  private readonly stockService = inject(StockService);
  private readonly permissionService = inject(PermissionService);

  outbounds = signal<StockOutbound[]>([]);
  searchQuery = signal('');

  filteredOutbounds = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.outbounds();
    return this.outbounds().filter(o => 
      o.reference.toLowerCase().includes(query) ||
      o.workshop.toLowerCase().includes(query) ||
      o.status.toLowerCase().includes(query)
    );
  });

  P = PERMISSIONS;

  ngOnInit(): void {
    this.loadOutbounds();
  }

  loadOutbounds(): void {
    this.stockService.getOutbounds().subscribe(data => this.outbounds.set(data));
  }

  has(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  validateOutbound(id: number): void {
    if (confirm('Valider ce bon de sortie ? Le stock sera débité automatiquement (FIFO).')) {
      this.stockService.validateOutbound(id).subscribe(() => this.loadOutbounds());
    }
  }

  cancelOutbound(id: number): void {
    if (confirm('Annuler ce bon de sortie ?')) {
      this.stockService.cancelOutbound(id).subscribe(() => this.loadOutbounds());
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'DRAFT': return 'badge-yellow';
      case 'VALIDATED': return 'badge-green';
      case 'CANCELLED': return 'badge-red';
      default: return 'badge-gray';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'DRAFT': return 'Brouillon';
      case 'VALIDATED': return 'Validé';
      case 'CANCELLED': return 'Annulé';
      default: return status;
    }
  }

  getReasonLabel(reason: string): string {
    switch (reason) {
      case 'PRODUCTION': return 'Production';
      case 'MAINTENANCE': return 'Maintenance';
      case 'OTHER': return 'Autre';
      default: return reason;
    }
  }
}
