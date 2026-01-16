import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../core/services/auth';
import { PermissionService } from '../../core/services/permission';

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        authService.login(credentials).pipe(
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error) => {
            let message = 'Une erreur est survenue lors de la connexion.';
            if (error.status === 401) message = 'Email ou mot de passe incorrect.';
            else if (error.status === 403) message = 'Accès refusé. Votre compte peut être désactivé.';
            else if (error.status === 0) message = 'Impossible de contacter le serveur.';
            else if (error.error?.message) message = error.error.message;
            return of(AuthActions.loginFailure({ error: message }));
          })
        )
      )
    ),
  { functional: true }
);

export const loginSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => router.navigate(['/dashboard']))
    ),
  { functional: true, dispatch: false }
);

export const register$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ data }) =>
        authService.register(data).pipe(
          map(() =>
            AuthActions.registerSuccess({
              message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.',
            })
          ),
          catchError((error) => {
            let message = "Une erreur est survenue lors de l'inscription.";
            if (error.status === 409) message = error.error?.message || 'Cette adresse email est déjà utilisée.';
            else if (error.status === 0) message = 'Impossible de contacter le serveur.';
            else if (error.error?.message) message = error.error.message;
            return of(AuthActions.registerFailure({ error: message }));
          })
        )
      )
    ),
  { functional: true }
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    permissionService = inject(PermissionService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        authService.logout();
        permissionService.clearCache();
        router.navigate(['/auth/login']);
      })
    ),
  { functional: true, dispatch: false }
);
