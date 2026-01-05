# 🎓 TRICOL Frontend - Technical Learning Guide

**Project**: TRICOL Inventory Management System  
**Tech Stack**: Angular 20, TypeScript, RxJS  
**Backend API**: Spring Boot with JWT Authentication

---

## 📐 Project Architecture

**Chosen Structure: Simplified Hybrid**

```
src/app/
├── core/                # Singleton services, guards, interceptors
│   ├── services/        # AuthService, TokenService, API services
│   ├── guards/          # AuthGuard, PermissionGuard
│   ├── interceptors/    # JwtInterceptor, ErrorInterceptor
│   └── models/          # TypeScript interfaces
│
├── shared/              # Reusable UI components
│   └── components/      # Header, Sidebar, Modals, etc.
│
└── features/            # Business logic modules
    ├── auth/            # Login, Register
    ├── dashboard/       # Role-based dashboards
    ├── fournisseurs/    # Suppliers management
    ├── produits/        # Products management
    ├── commandes/       # Orders management
    ├── stock/           # Stock & lots
    ├── bons-sortie/     # Outbound orders
    └── admin/           # User & permission management
```

---

## 🔧 Day 1 - January 5, 2026

### Step 1: Environment Configuration (09:14:37)

**File Created:** `src/environments/environment.ts`

**Purpose:** Centralized configuration for API URLs and app settings

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  apiTimeout: 30000,
  tokenRefreshThreshold: 300000,
  accessTokenExpiration: 1800000,
  refreshTokenExpiration: 86400000,
  enableDebugLogs: true,
  enableConsoleErrors: true
};
```

**Key Concepts:**
- Environment files allow different configs for dev/prod without code changes
- Use `import { environment } from '../environments/environment'` in services
- Angular automatically selects the right file based on build configuration

**Commit:** `feat: add environment configuration for API integration`

---

### Step 2: Core Module Creation (09:52:18)

**Command Used:** `ng generate module core`

**File Created:** `src/app/core/core.module.ts`

**Purpose:** Container module for singleton services, guards, interceptors, and models

```typescript
@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class CoreModule { }
```

**What is a Module?**
- Groups related functionality together
- `CoreModule` is special - loaded once at app startup
- Will contain app-wide services (AuthService, TokenService, etc.)
- Follows singleton pattern - services instantiated once and shared

**Next Steps:**
- Create services folder and AuthService
- Create guards for route protection
- Create interceptors for HTTP requests

**Commit:** `feat: add core module for app-wide services`

---

### Step 3: Shared Module Creation (10:08:45)

**Command Used:** `ng generate module shared`

**File Created:** `src/app/shared/shared-module.ts`

**Purpose:** Container for reusable UI components (Header, Sidebar, Modals, etc.)

**Commit:** `feat: add shared module for reusable components`

---

**Command Structure:**
```bash
ng generate <schematic> <name> [options]
```

**Common Schematics:**
```bash
ng g m my-module                    # Generate module
ng g c my-component                 # Generate component
ng g s my-service                   # Generate service
ng g g my-guard                     # Generate guard
ng g interceptor my-interceptor     # Generate interceptor
ng g interface my-interface         # Generate interface
```

**Key Flags:**
- `--skip-tests` - Don't generate spec files
- `--flat` - Don't create a subfolder
- `--module` - Specify which module to import into

---

## 🧩 Architecture Breakdown

### core/ - Singleton Services & Utilities
- **Purpose:** App-wide services that run once at startup
- **Contains:** Services, Guards, Interceptors, Models
- **Example:** AuthService (used everywhere for authentication)

### shared/ - Reusable UI Components  
- **Purpose:** Components used across multiple features
- **Contains:** Header, Sidebar, Modals, Loading spinners
- **Example:** HeaderComponent (appears on every page)

### features/ - Business Logic Modules
- **Purpose:** Independent feature modules
- **Contains:** Feature-specific components, services, routing
- **Example:** `fournisseurs/` handles all supplier operations

**Golden Rule:**  
- Used everywhere? → `core/` or `shared/`
- Feature-specific? → `features/`

---

*Last Updated: January 5, 2026 at 09:47:23*
