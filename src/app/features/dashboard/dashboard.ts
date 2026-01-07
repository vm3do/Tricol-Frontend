import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { PermissionService } from '../../core/services/permission';
import { PERMISSIONS } from '../../core/models/permission.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly permissionService = inject(PermissionService);

  // Expose permissions to template
  readonly PERMISSIONS = PERMISSIONS;

  logout(): void {
    this.authService.logout();
    this.permissionService.clearCache();
    this.router.navigate(['/auth/login']);
  }
}




