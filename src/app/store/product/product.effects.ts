import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ProductActions } from './product.actions';
import { ProductService } from '../../core/services/product';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions), service = inject(ProductService)) =>
    actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        service.getAll().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.error?.message || 'Erreur de chargement.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const createProduct$ = createEffect(
  (actions$ = inject(Actions), service = inject(ProductService), router = inject(Router)) =>
    actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) =>
        service.create(product).pipe(
          map((created) => ProductActions.createProductSuccess({ product: created })),
          tap(() => router.navigate(['/products'])),
          catchError((error) =>
            of(ProductActions.createProductFailure({ error: error.error?.message || "Erreur lors de l'enregistrement." }))
          )
        )
      )
    ),
  { functional: true }
);

export const updateProduct$ = createEffect(
  (actions$ = inject(Actions), service = inject(ProductService), router = inject(Router)) =>
    actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ id, product }) =>
        service.update(id, product).pipe(
          map((updated) => ProductActions.updateProductSuccess({ product: updated })),
          tap(() => router.navigate(['/products'])),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error: error.error?.message || 'Erreur lors de la mise à jour.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const deleteProduct$ = createEffect(
  (actions$ = inject(Actions), service = inject(ProductService)) =>
    actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        service.delete(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error: error.error?.message || 'Erreur lors de la suppression.' }))
          )
        )
      )
    ),
  { functional: true }
);
