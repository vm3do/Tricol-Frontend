import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/auth/auth.actions';
import { PermissionService } from '../../../core/services/permission';
import { PERMISSIONS } from '../../../core/models/permission.model';
import { TokenService } from '../../../core/services/token';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly permissionService = inject(PermissionService);
  private readonly tokenService = inject(TokenService);

  @Input() isOpen = false;

  userEmail = 'Utilisateur';

  ngOnInit(): void {
    const token = this.tokenService.getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userEmail = payload.sub || 'Utilisateur';
      } catch (e) {
        // ignore
      }
    }
  }

  has(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  get P() {
    return PERMISSIONS;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
