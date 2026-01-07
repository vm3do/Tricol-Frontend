import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth Guard - Checking authentication for:', state.url);
  const isAuth = authService.isAuthenticated();
  console.log('Auth Guard - Is authenticated:', isAuth);

  if (isAuth) {
    return true;
  }

  console.log('Auth Guard - Redirecting to login');
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};




