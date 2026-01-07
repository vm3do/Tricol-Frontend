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

---

## 🔧 Day 2 - January 6, 2026

### Step 5: Tailwind CSS Setup (09:17:42)

**Installed Packages:**
- `tailwindcss@^3` - Utility-first CSS framework
- `postcss` - CSS transformation tool
- `autoprefixer` - Auto-add vendor prefixes

**Files Created:**
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

**Global Styles Updated:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Why Tailwind?**
- Utility-first approach (no custom CSS needed)
- Responsive design built-in
- Consistent design system
- Faster development with pre-built classes

**Commit:** `chore: setup Tailwind CSS` (09:17:42)

---

### Step 6: Auth Feature Module (10:34:18 - 14:55:33)

**Components Created:**
1. Login Component
2. Register Component

**Login Component Features:**
```typescript
- Reactive Form with validation
- Email + Password fields
- Error handling (401, network errors)
- Loading states
- Redirect after successful login
- Link to register page
```

**Register Component Features:**
```typescript
- Reactive Form with validation
- Full Name, Email, Password, Confirm Password
- Password matching validation
- Success message with auto-redirect
- Link to login page
```

**Tailwind Styling:**
```html
- Gradient background (indigo to purple)
- White card with shadow
- Responsive design
- Focus states on inputs
- Error states (red borders)
- Disabled button states
```

**Routing Configuration:**
```typescript
/auth/login → LoginComponent
/auth/register → RegisterComponent
/ → redirect to /auth/login
```

**Key Angular 20 Features Used:**
- `@if` control flow (instead of *ngIf)
- `@for` control flow (instead of *ngFor)
- Standalone components (no NgModule declarations)
- Functional guards and interceptors
- Signal-based reactivity ready

**Commits:**
- `feat: convert auth components to Tailwind CSS` (10:34:18)
- `chore: clean up app template` (11:48:55)
- `fix: configure Tailwind PostCSS plugin for Angular` (14:22:09)
- `fix: downgrade to Tailwind v3 for Angular compatibility` (14:55:33)
- `fix: clean app.html template to only contain router outlet` (15:12:44)
- `feat: redesign auth pages with professional stock management theme and fix router links` (16:38:22)
- `fix: improve error handling and resolve loading state issue on login` (17:15:48)
- `feat: add dashboard page with welcome screen and stats cards` (17:42:31)
- `fix: correct dashboard component class name and add logout functionality` (17:48:55)
- `chore: remove unnecessary NgModule files for Angular 20 standalone architecture` (18:05:22)

**Bugs Fixed (16:38:22):**
1. **RouterLink not working** - Added `RouterLink` to component imports
2. **Registration success not showing** - Fixed backend response type (text instead of JSON)
3. **Poor color scheme** - Changed from purple/indigo to amber/orange (stock management theme)
4. **Missing icons** - Added inline SVG icons for better UX
5. **French translation** - Converted all text to French for TRICOL users

**New Design Features:**
- Amber/Orange gradient background (warm, professional)
- Stock management icon (box/warehouse) in logo
- Input fields with left-side icons
- Better error/success messages with icons
- Smooth hover animations on buttons
- Professional shadow and border effects
- Mobile-responsive design maintained
- Copyright footer

**Dashboard Features (17:42:31):**
- Welcome screen after login
- 4 stat cards (Fournisseurs, Produits, Commandes, Stock Critique)
- Logout button in header
- List of upcoming modules
- Protected by AuthGuard

**Architecture Note:**
Angular 20 uses **standalone components** - no NgModule needed! We removed `core-module.ts` and `shared-module.ts` as they're unnecessary. Components import dependencies directly in their decorator.

---

## 🔧 Day 3 - January 7, 2026

### Step 7: Suppliers Module - List Page (09:23:47 - 11:32:15)

**Models Created:**
- `Supplier` interface with backend field names
- `SupplierCreateRequest` - for creating suppliers
- `SupplierUpdateRequest` - for updating suppliers

**Services Created:**
- `SupplierService` with CRUD methods:
  - `getAll()` - Get all suppliers
  - `getById(id)` - Get supplier by ID
  - `create(supplier)` - Create new supplier
  - `update(id, supplier)` - Update supplier
  - `delete(id)` - Delete supplier
  - `search(keyword)` - Search suppliers

**Components Created:**
- `FournisseursListComponent` - Suppliers list with table

**Features:**
- ✅ Table view with all supplier data
- ✅ Search functionality (prepared for backend)
- ✅ Edit, Delete action buttons
- ✅ Empty state when no suppliers
- ✅ Loading state with spinner
- ✅ Beautiful blue-themed design

**Key Fixes:**
- Fixed API endpoint: `/api/fournisseurs` → `/api/v1/suppliers`
- Fixed field names to match backend: `companyName`, `contactPerson`, `phone`
- Implemented JWT Interceptor to add Bearer token
- Added manual change detection for proper UI updates
- Permission-based access control system

**Commits:**
- `feat: add suppliers list page with search and pagination` (09:23:47)
- `fix: implement SupplierService and fix template Math issue` (09:35:18)
- `debug: add console logs to track authentication issue` (09:47:32)
- `fix: correct API endpoints, field names, and implement JWT interceptor` (10:15:33)
- `feat: implement permission-based access control with string constants and fix suppliers list loading` (11:18:44)
- `chore: remove debug console logs and clean up code` (11:32:15)

---

### Step 8: Suppliers Module - Create/Edit Form (14:25:33)

**Components Created:**
- `FournisseursFormComponent` - Create and edit suppliers

**Form Features:**
```typescript
Fields:
- Company Name (required, min 3 chars)
- Address (required)
- City (required)
- Contact Person (required)
- Email (required, email format)
- Phone (required)
- ICE (required, min 10 chars)

Functionality:
- Reactive Forms with validation
- Real-time validation feedback
- Red borders and backgrounds for errors
- Disabled submit button when invalid
- Loading state during save
- Error handling with specific messages
- Auto-detect create vs edit mode from URL
- Load existing data in edit mode
```

**Routes Added:**
```typescript
/fournisseurs/new → Create new supplier
/fournisseurs/edit/:id → Edit existing supplier
```

**Commit:**
- `feat: add supplier create/edit form with validation` (14:25:33)

---

## 📖 Angular CLI Quick Reference

**Components Created:**
1. User Model (`user.model.ts`)
2. TokenService (`token.ts`)
3. AuthService (`auth.ts`)
4. JWT Interceptor (`jwt-interceptor.ts`)
5. Error Interceptor (`error-interceptor.ts`)
6. Auth Guard (`auth-guard.ts`)

**Key Implementation Details:**

**TokenService:**
```typescript
setAccessToken(token: string): void
getAccessToken(): string | null
isTokenExpired(token: string): boolean
hasValidToken(): boolean
```
- Stores JWT tokens in localStorage
- Validates token expiration by decoding JWT payload
- Provides helper methods for token management

**AuthService:**
```typescript
login(credentials: LoginRequest): Observable<AuthResponse>
register(data: RegisterRequest): Observable<string>
logout(): void
isAuthenticated(): boolean
```
- Uses RxJS BehaviorSubject for reactive user state
- Integrates with TokenService for token storage
- Makes HTTP calls to backend `/api/auth` endpoints

**JWT Interceptor:**
- Automatically adds `Authorization: Bearer <token>` header to all HTTP requests
- Checks token validity before adding to request

**Error Interceptor:**
- Catches 401 errors → Logout and redirect to login
- Catches 403 errors → Log access denied
- Global error handling for all HTTP requests

**Auth Guard:**
- Protects routes requiring authentication
- Redirects to login with returnUrl parameter
- Uses functional guard pattern (Angular 20 style)

**App Configuration:**
```typescript
provideHttpClient(
  withInterceptors([jwtInterceptor, errorInterceptor])
)
```

**Commits:**
- `feat: add core services and interceptors for authentication` (10:31:27)
- `feat: add auth guard for route protection` (10:45:52)
- `chore: configure HTTP client with interceptors` (11:02:38)

---

## 📖 Angular CLI Quick Reference
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
