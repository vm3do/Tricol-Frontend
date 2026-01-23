import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService, AuditLog } from '../../../core/services/admin';

@Component({
  selector: 'app-audit-log-list',
  imports: [DatePipe],
  templateUrl: './audit-log-list.html',
  styleUrl: './audit-log-list.css',
})
export class AuditLogListComponent implements OnInit {
  private readonly adminService = inject(AdminService);

  auditLogs = signal<AuditLog[]>([]);
  searchQuery = signal('');

  filteredLogs = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.auditLogs();
    return this.auditLogs().filter(l => 
      l.action.toLowerCase().includes(query) ||
      l.entityType.toLowerCase().includes(query) ||
      l.userName.toLowerCase().includes(query) ||
      l.details.toLowerCase().includes(query)
    );
  });

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  ngOnInit(): void {
    this.adminService.getAuditLogs().subscribe(logs => this.auditLogs.set(logs));
  }
}
