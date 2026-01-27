# TRICOL Frontend

> Système de Gestion des Approvisionnements — Angular 21 + NgRx + Tailwind CSS

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
ng serve

# Open http://localhost:4200
```

> **Backend required**: The API must be running at `http://localhost:8080/api`. See `FRONTEND_API_DOCUMENTATION.md` for setup details.

---

## 📂 Project Structure

```
src/app/
├── components/
│   ├── landing/              # Public landing page
│   ├── auth/
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── layout/
│   │   ├── sidebar/          # Role-aware sidebar navigation
│   │   ├── header/           # Top header bar
│   │   └── layout.ts         # Layout shell (sidebar + header + router-outlet)
│   ├── dashboard/            # Dashboard with stats
│   ├── fournisseurs/
│   │   ├── fournisseurs-list/ # Supplier list with RBAC actions
│   │   └── fournisseurs-form/ # Create/edit supplier
│   ├── products/
│   │   ├── product-list/     # Product list with RBAC actions
│   │   └── product-form/     # Create/edit product
│   ├── orders/
│   │   ├── order-list/       # Order list with lifecycle actions
│   │   └── order-form/       # Create order with dynamic items
│   ├── stock/
│   │   └── stock-overview/   # Stock summary + alerts
│   └── admin/
│       └── user-list/        # User management (admin only)
├── core/
│   ├── models/               # TypeScript interfaces (User, Product, Order, Stock, Permission)
│   ├── services/             # HTTP services (auth, token, supplier, product, order, stock, admin, permission)
│   ├── guards/               # Route guards (auth-guard, permission-guard)
│   ├── interceptors/         # JWT interceptor
│   └── directives/           # HasPermission structural directive
├── store/                    # NgRx state management
│   ├── auth/                 # Auth actions, reducer, effects, selectors
│   ├── supplier/             # Supplier CRUD state
│   ├── product/              # Product CRUD state
│   ├── order/                # Order lifecycle state
│   ├── stock/                # Stock summary state
│   └── index.ts              # Root AppState
├── app.routes.ts             # Route configuration with permission guards
└── app.config.ts             # App config (NgRx providers, HTTP interceptors)
```

---

## 🔐 Authentication System

### How It Works

TRICOL uses **JWT (JSON Web Token)** authentication. Tokens are stored in the browser's **`localStorage`**.

```
┌──────────┐     POST /api/auth/login      ┌──────────┐
│  Browser  │ ──────────────────────────▶  │  Backend  │
│  (Angular)│                              │  (Spring) │
│           │ ◀────────────────────────────│           │
└──────────┘  { accessToken, refreshToken } └──────────┘
      │
      ▼
  localStorage
  ┌──────────────────────────────────┐
  │ tricol_access_token  = "eyJ..."  │
  │ tricol_refresh_token = "eyJ..."  │
  └──────────────────────────────────┘
      │
      ▼  (every HTTP request)
  jwtInterceptor attaches:
  Authorization: Bearer <accessToken>
```

### Token Lifecycle

| Token | Expiration | Storage Key |
|---|---|---|
| Access Token | 30 minutes | `tricol_access_token` |
| Refresh Token | 24 hours | `tricol_refresh_token` |

### Key Services

| Service | File | Responsibility |
|---|---|---|
| `TokenService` | `core/services/token.ts` | Read/write/clear tokens in localStorage, check expiration |
| `AuthService` | `core/services/auth.ts` | Login, register, logout, check authentication status |
| `PermissionService` | `core/services/permission.ts` | Decode JWT payload to extract permissions array |
| `jwtInterceptor` | `core/interceptors/jwt-interceptor.ts` | Attach Bearer token to all outgoing HTTP requests |
| `authGuard` | `core/guards/auth-guard.ts` | Block unauthenticated users from protected routes |
| `permissionGuard` | `core/guards/permission-guard.ts` | Block users without required permission for a route |

### Login Flow (Step by Step)

1. User fills email/password on `/auth/login`
2. `LoginComponent` dispatches `AuthActions.login({ email, password })`
3. NgRx effect calls `AuthService.login()` → `POST /api/auth/login`
4. Backend validates credentials, returns `{ accessToken, refreshToken, tokenType }`
5. `AuthService.login()` uses `TokenService` to store both tokens in `localStorage`
6. Effect dispatches `AuthActions.loginSuccess()` → navigates to `/dashboard`
7. All subsequent API calls include `Authorization: Bearer <token>` via `jwtInterceptor`

### Permission Extraction

The JWT payload contains a `permissions` (or `authorities`) array:

```json
{
  "sub": "user@tricol.ma",
  "permissions": ["VIEW_PRODUCT", "CREATE_PRODUCT", "VIEW_STOCK", ...],
  "exp": 1741698000
}
```

`PermissionService.getUserPermissions()` decodes the JWT, strips `ROLE_` prefixes, and caches the result. This is used by:

- **`permissionGuard`** — blocks route navigation
- **`PermissionService.hasPermission()`** — used in components to show/hide UI elements
- **`HasPermissionDirective`** — structural directive for template-level control

---

## 👥 Roles & Permissions Matrix

The backend has **4 roles** with **22 granular permissions**. New users have **no role** until an admin assigns one.

### ADMIN (22 permissions)
Full access to everything. Can manage users, roles, and permissions.

### RESPONSABLE_ACHATS (14 permissions)
Manages the procurement process: suppliers, products, and orders.

### MAGASINIER (8 permissions)
Warehouse operator: receives orders, manages stock, validates outbounds.

### CHEF_ATELIER (5 permissions)
Workshop manager: views products and stock, creates outbounds for production.

### Detailed Matrix

| Permission | ADMIN | RESP. ACHATS | MAGASINIER | CHEF ATELIER |
|---|:---:|:---:|:---:|:---:|
| VIEW_SUPPLIER | ✅ | ✅ | — | — |
| CREATE_SUPPLIER | ✅ | ✅ | — | — |
| UPDATE_SUPPLIER | ✅ | ✅ | — | — |
| DELETE_SUPPLIER | ✅ | — | — | — |
| VIEW_PRODUCT | ✅ | ✅ | ✅ | ✅ |
| CREATE_PRODUCT | ✅ | ✅ | — | — |
| UPDATE_PRODUCT | ✅ | ✅ | — | — |
| DELETE_PRODUCT | ✅ | — | — | — |
| VIEW_ORDER | ✅ | ✅ | ✅ | — |
| CREATE_ORDER | ✅ | ✅ | — | — |
| UPDATE_ORDER | ✅ | ✅ | — | — |
| VALIDATE_ORDER | ✅ | ✅ | — | — |
| RECEIVE_ORDER | ✅ | — | ✅ | — |
| CANCEL_ORDER | ✅ | ✅ | — | — |
| VIEW_STOCK | ✅ | ✅ | ✅ | ✅ |
| VIEW_STOCK_MOVEMENTS | ✅ | — | ✅ | — |
| VIEW_OUTPUT_SLIP | ✅ | — | ✅ | ✅ |
| CREATE_OUTPUT_SLIP | ✅ | — | — | ✅ |
| VALIDATE_OUTPUT_SLIP | ✅ | — | ✅ | — |
| CANCEL_OUTPUT_SLIP | ✅ | — | — | — |
| MANAGE_USERS | ✅ | — | — | — |
| MANAGE_ROLES | ✅ | — | — | — |
| VIEW_AUDIT_LOGS | ✅ | — | — | — |

---

## 🧪 User Stories — Testing Guide

### Prerequisites

1. Start the backend: `./mvnw spring-boot:run` (or run from IntelliJ)
2. Start the frontend: `ng serve`
3. The backend auto-seeds 4 roles on first run
4. Register users and assign roles via the admin endpoint

### Test Accounts Setup

Use the register page or API to create these test users:

```
POST /api/auth/register
```

| User | Email | Password |
|---|---|---|
| Admin | admin@tricol.ma | Admin123! |
| Resp. Achats | achats@tricol.ma | Achats123! |
| Magasinier | magasin@tricol.ma | Magasin123! |
| Chef Atelier | atelier@tricol.ma | Atelier123! |

Then assign roles via admin endpoint:

```
POST /api/admin/users/assign-role
{ "userId": <id>, "roleName": "ADMIN" }
{ "userId": <id>, "roleName": "RESPONSABLE_ACHATS" }
{ "userId": <id>, "roleName": "MAGASINIER" }
{ "userId": <id>, "roleName": "CHEF_ATELIER" }
```

---

### Story 1: Landing Page (Public)

**As a** visitor, I can see the landing page.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `http://localhost:4200` | Landing page with hero, feature cards, roles section |
| 2 | Hover over any feature card | Overlay appears showing permissions/details |
| 3 | Click "Connexion" | Redirected to `/auth/login` |
| 4 | Click "Créer un Compte" | Redirected to `/auth/register` |

---

### Story 2: Registration

**As a** new user, I can register an account.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Go to `/auth/register` | Registration form with fullName, email, password, confirm |
| 2 | Fill in all fields correctly | Submit button enabled |
| 3 | Submit the form | Success message: "Inscription réussie" |
| 4 | Click "Se connecter" link | Redirected to login page |

> **Note**: Newly registered users have **no role**. An admin must assign one before they can access anything beyond the dashboard.

---

### Story 3: Login and Dashboard

**As a** registered user, I can log in and see my dashboard.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Go to `/auth/login` | Login form |
| 2 | Enter valid credentials | Submit enabled |
| 3 | Submit | Redirected to `/dashboard` |
| 4 | Verify sidebar | Only shows links you have permissions for |
| 5 | Verify dashboard | Shows stat cards and pending orders |

---

### Story 4: Admin — Full Access

**As an** admin, I have full access to all features.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as `admin@tricol.ma` | Dashboard loads |
| 2 | Check sidebar | All links visible: Fournisseurs, Produits, Commandes, Stock, Bons de Sortie, Utilisateurs, Journal d'Audit |
| 3 | Go to `/fournisseurs` | "Nouveau Fournisseur" button visible, edit/delete actions on each row |
| 4 | Go to `/products` | "Nouveau Produit" button visible, edit/delete actions on each row |
| 5 | Go to `/orders` | "Nouvelle Commande" button visible, validate/receive/cancel buttons |
| 6 | Go to `/stock` | Stock summary with levels table |
| 7 | Go to `/admin/users` | User management table |

---

### Story 5: Responsable Achats — Procurement

**As a** responsable achats, I manage suppliers and orders.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as `achats@tricol.ma` | Dashboard loads |
| 2 | Check sidebar | Fournisseurs, Produits, Commandes, Stock visible. **No** Utilisateurs or Audit |
| 3 | Go to `/fournisseurs` | "Nouveau" visible, edit ✅, delete ❌ (DELETE_SUPPLIER not granted) |
| 4 | Go to `/products` | "Nouveau" visible, edit ✅, delete ❌ |
| 5 | Go to `/orders` | "Nouvelle Commande" visible, validate ✅, cancel ✅, receive ❌ |
| 6 | Try navigating to `/admin/users` | Redirected to `/dashboard` (blocked by guard) |

---

### Story 6: Magasinier — Warehouse Operations

**As a** magasinier, I receive orders and manage stock.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as `magasin@tricol.ma` | Dashboard loads |
| 2 | Check sidebar | Produits, Commandes, Stock, Bons de Sortie visible. **No** Fournisseurs or Admin |
| 3 | Go to `/products` | List visible, but **no** "Nouveau" button, **no** edit/delete buttons |
| 4 | Go to `/orders` | List visible, **no** "Nouvelle Commande", **no** validate/cancel. Receive ✅ (for VALIDATED orders) |
| 5 | Go to `/stock` | Full stock summary visible |
| 6 | Try navigating to `/fournisseurs` | Redirected to `/dashboard` (no VIEW_SUPPLIER permission) |

---

### Story 7: Chef d'Atelier — Workshop

**As a** chef d'atelier, I view stock and create outbounds for production.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as `atelier@tricol.ma` | Dashboard loads |
| 2 | Check sidebar | Produits, Stock, Bons de Sortie visible. **No** Fournisseurs, Commandes, or Admin |
| 3 | Go to `/products` | List visible, but **no** create/edit/delete buttons |
| 4 | Go to `/stock` | Stock summary visible |
| 5 | Try navigating to `/orders` | Redirected to `/dashboard` (no VIEW_ORDER) |
| 6 | Try navigating to `/fournisseurs` | Redirected to `/dashboard` (no VIEW_SUPPLIER) |

---

### Story 8: Permission Override

**As an** admin, I can grant/revoke individual permissions.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Grant `DELETE_SUPPLIER` to the Responsable Achats user | `POST /api/admin/users/permission-override { "userId": <id>, "permissionName": "DELETE_SUPPLIER", "granted": true }` |
| 2 | Login as `achats@tricol.ma` | Dashboard |
| 3 | Go to `/fournisseurs` | Delete button now visible on each supplier row |
| 4 | Revoke the permission (granted: false) | On next login, delete button hidden again |

---

### Story 9: Token Expiration

**As a** user, when my token expires I am redirected to login.

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login normally | Dashboard loads |
| 2 | Wait 30 minutes (or manually clear `tricol_access_token` from localStorage via DevTools) | — |
| 3 | Try to navigate to any protected page | Redirected to `/auth/login` |
| 4 | Login again | New tokens issued, dashboard accessible |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 21 | Frontend framework |
| NgRx | 19 | State management (Store, Effects) |
| Tailwind CSS | 3.4 | Utility-first styling |
| TypeScript | 5.8 | Type safety |
| RxJS | 7.8 | Reactive programming |

---

## 📝 Design Principles

- **Flat, minimalist** — No gradients, clean borders, subtle shadows
- **Green accent** (`#16A34A`) — Primary brand color
- **Inter font** — Modern, readable, professional
- **RBAC-driven UI** — Elements hidden/shown based on JWT permissions
- **CLI-standard structure** — Components, services, guards, models in proper folders
