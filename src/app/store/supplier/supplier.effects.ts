import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { SupplierActions } from './supplier.actions';
import { SupplierService } from '../../core/services/supplier';

export const loadSuppliers$ = createEffect(
  (actions$ = inject(Actions), service = inject(SupplierService)) =>
    actions$.pipe(
      ofType(SupplierActions.loadSuppliers),
      mergeMap(() =>
        service.getAll().pipe(
          map((suppliers) => SupplierActions.loadSuppliersSuccess({ suppliers })),
          catchError((error) =>
            of(SupplierActions.loadSuppliersFailure({ error: error.error?.message || 'Erreur lors du chargement.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const createSupplier$ = createEffect(
  (actions$ = inject(Actions), service = inject(SupplierService), router = inject(Router)) =>
    actions$.pipe(
      ofType(SupplierActions.createSupplier),
      mergeMap(({ supplier }) =>
        service.create(supplier).pipe(
          map((created) => SupplierActions.createSupplierSuccess({ supplier: created })),
          tap(() => router.navigate(['/fournisseurs'])),
          catchError((error) => {
            let msg = "Erreur lors de l'enregistrement.";
            if (error.status === 409) msg = 'Un fournisseur avec cet ICE existe déjà.';
            else if (error.error?.message) msg = error.error.message;
            return of(SupplierActions.createSupplierFailure({ error: msg }));
          })
        )
      )
    ),
  { functional: true }
);

export const updateSupplier$ = createEffect(
  (actions$ = inject(Actions), service = inject(SupplierService), router = inject(Router)) =>
    actions$.pipe(
      ofType(SupplierActions.updateSupplier),
      mergeMap(({ id, supplier }) =>
        service.update(id, supplier).pipe(
          map((updated) => SupplierActions.updateSupplierSuccess({ supplier: updated })),
          tap(() => router.navigate(['/fournisseurs'])),
          catchError((error) =>
            of(SupplierActions.updateSupplierFailure({ error: error.error?.message || 'Erreur lors de la mise à jour.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const deleteSupplier$ = createEffect(
  (actions$ = inject(Actions), service = inject(SupplierService)) =>
    actions$.pipe(
      ofType(SupplierActions.deleteSupplier),
      mergeMap(({ id }) =>
        service.delete(id).pipe(
          map(() => SupplierActions.deleteSupplierSuccess({ id })),
          catchError((error) =>
            of(SupplierActions.deleteSupplierFailure({ error: error.error?.message || 'Erreur lors de la suppression.' }))
          )
        )
      )
    ),
  { functional: true }
);
