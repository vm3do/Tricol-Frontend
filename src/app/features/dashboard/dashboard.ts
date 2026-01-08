import {Component, Inject, inject, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { PermissionService } from '../../core/services/permission';
import { PERMISSIONS } from '../../core/models/permission.model';
import { CommonModule } from '@angular/common';
import {SupplierService} from '../../core/services/supplier';
import {Observable} from 'rxjs';
import {Stats} from '../stats/stats';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, Stats],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly permissionService = inject(PermissionService);

  // Expose permissions to template
  readonly PERMISSIONS = PERMISSIONS;

  private readonly supplierService = inject(SupplierService);

  countElement = signal(0);
  private loading = signal(false);

  logout(): void {
    this.authService.logout();
    this.permissionService.clearCache();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
    this.loadSuppliers();
  }



  loadSuppliers(): void{
    this.loading.set(true);
    this.supplierService.getAll().subscribe((data) => {
          this.countElement.set(data.length);
        console.log(this.countElement);
    })

  }
}




