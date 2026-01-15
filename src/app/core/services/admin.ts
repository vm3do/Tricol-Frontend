import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  enabled: boolean;
  locked: boolean;
  roleName: string | null;
  createdAt: string;
}

export interface AssignRoleRequest {
  userId: number;
  roleName: string;
}

export interface PermissionOverrideRequest {
  userId: number;
  permissionName: string;
  granted: boolean;
}

export interface AuditLog {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  userId: number;
  userName: string;
  timestamp: string;
  details: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/users`);
  }

  assignRole(data: AssignRoleRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/users/assign-role`, data, { responseType: 'text' });
  }

  overridePermission(data: PermissionOverrideRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/users/permission-override`, data, { responseType: 'text' });
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/permissions`);
  }

  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.apiUrl}/audit-logs`);
  }
}
