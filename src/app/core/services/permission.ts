import { Injectable, inject } from '@angular/core';
import { TokenService } from './token';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly tokenService = inject(TokenService);
  private cachedPermissions: string[] = [];

  getUserPermissions(): string[] {
    if (this.cachedPermissions.length > 0) {
      return this.cachedPermissions;
    }

    const token = this.tokenService.getAccessToken();
    if (!token) {
      this.cachedPermissions = [];
      return [];
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const permissions = payload.permissions || payload.authorities || [];
      this.cachedPermissions = permissions.map((p: string) => p.replace('ROLE_', ''));
      console.log('User permissions:', this.cachedPermissions);
      return this.cachedPermissions;
    } catch (error) {
      console.error('Error parsing token for permissions:', error);
      this.cachedPermissions = [];
      return [];
    }
  }

  hasPermission(permission: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }

  clearCache(): void {
    this.cachedPermissions = [];
  }
}

