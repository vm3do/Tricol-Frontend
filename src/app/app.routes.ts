import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { permissionGuard } from './core/guards/permission-guard';

export const routes: Routes = [
  // Public: Landing page
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/landing/landing').then((m) => m.LandingComponent),
  },

  // Auth (no layout)
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./components/auth/register/register').then((m) => m.RegisterComponent),
  },

  // App shell (with layout, requires auth)
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.DashboardComponent),
      },

      // Suppliers
      {
        path: 'fournisseurs',
        loadComponent: () =>
          import('./components/fournisseurs/fournisseurs-list/fournisseurs-list').then((m) => m.FournisseursListComponent),
        canActivate: [permissionGuard],
        data: { permission: 'VIEW_SUPPLIER' },
      },
      {
        path: 'fournisseurs/new',
        loadComponent: () =>
          import('./components/fournisseurs/fournisseurs-form/fournisseurs-form').then((m) => m.FournisseursFormComponent),
        canActivate: [permissionGuard],
        data: { permission: 'CREATE_SUPPLIER' },
      },
      {
        path: 'fournisseurs/edit/:id',
        loadComponent: () =>
          import('./components/fournisseurs/fournisseurs-form/fournisseurs-form').then((m) => m.FournisseursFormComponent),
        canActivate: [permissionGuard],
        data: { permission: 'UPDATE_SUPPLIER' },
      },

      // Products
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/product-list/product-list').then((m) => m.ProductListComponent),
        canActivate: [permissionGuard],
        data: { permission: 'VIEW_PRODUCT' },
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./components/products/product-form/product-form').then((m) => m.ProductFormComponent),
        canActivate: [permissionGuard],
        data: { permission: 'CREATE_PRODUCT' },
      },
      {
        path: 'products/edit/:id',
        loadComponent: () =>
          import('./components/products/product-form/product-form').then((m) => m.ProductFormComponent),
        canActivate: [permissionGuard],
        data: { permission: 'UPDATE_PRODUCT' },
      },

      // Orders
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/orders/order-list/order-list').then((m) => m.OrderListComponent),
        canActivate: [permissionGuard],
        data: { permission: 'VIEW_ORDER' },
      },
      {
        path: 'orders/new',
        loadComponent: () =>
          import('./components/orders/order-form/order-form').then((m) => m.OrderFormComponent),
        canActivate: [permissionGuard],
        data: { permission: 'CREATE_ORDER' },
      },

      // Stock
      {
        path: 'stock',
        loadComponent: () =>
          import('./components/stock/stock-overview/stock-overview').then((m) => m.StockOverviewComponent),
        canActivate: [permissionGuard],
        data: { permission: 'VIEW_STOCK' },
      },

      // Stock Outbound (Bons de Sortie)
      {
        path: 'stock-outbound',
        loadComponent: () =>
          import('./components/stock-outbound/outbound-list/outbound-list').then((m) => m.OutboundListComponent),
        canActivate: [permissionGuard],
        data: { permission: 'VIEW_OUTPUT_SLIP' },
      },

      // Admin
      {
        path: 'admin/users',
        loadComponent: () =>
          import('./components/admin/user-list/user-list').then((m) => m.UserListComponent),
        canActivate: [permissionGuard],
        data: { permission: 'MANAGE_USERS' },
      },
      {
        path: 'admin/audit-logs',
        loadComponent: () =>
          import('./components/admin/audit-log-list/audit-log-list').then((m) => m.AuditLogListComponent),
        canActivate: [permissionGuard],
        data: { permission: 'VIEW_AUDIT_LOGS' },
      },
    ],
  },

  // Fallback
  { path: '**', redirectTo: '' },
];
