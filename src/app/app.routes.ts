import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'fournisseurs',
    loadComponent: () => import('./features/fournisseurs/fournisseurs-list/fournisseurs-list').then(m => m.FournisseursListComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];





