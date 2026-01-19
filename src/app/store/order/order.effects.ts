import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { OrderActions } from './order.actions';
import { OrderService } from '../../core/services/order';

export const loadOrders$ = createEffect(
  (actions$ = inject(Actions), service = inject(OrderService)) =>
    actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap(() =>
        service.getAll().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) =>
            of(OrderActions.loadOrdersFailure({ error: error.error?.message || 'Erreur de chargement.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const createOrder$ = createEffect(
  (actions$ = inject(Actions), service = inject(OrderService), router = inject(Router)) =>
    actions$.pipe(
      ofType(OrderActions.createOrder),
      mergeMap(({ order }) =>
        service.create(order).pipe(
          map((created) => OrderActions.createOrderSuccess({ order: created })),
          tap(() => router.navigate(['/orders'])),
          catchError((error) =>
            of(OrderActions.createOrderFailure({ error: error.error?.message || "Erreur lors de la création." }))
          )
        )
      )
    ),
  { functional: true }
);

export const validateOrder$ = createEffect(
  (actions$ = inject(Actions), service = inject(OrderService)) =>
    actions$.pipe(
      ofType(OrderActions.validateOrder),
      mergeMap(({ id }) =>
        service.validate(id).pipe(
          map((order) => OrderActions.validateOrderSuccess({ order })),
          catchError((error) =>
            of(OrderActions.validateOrderFailure({ error: error.error?.message || 'Erreur lors de la validation.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const receiveOrder$ = createEffect(
  (actions$ = inject(Actions), service = inject(OrderService)) =>
    actions$.pipe(
      ofType(OrderActions.receiveOrder),
      mergeMap(({ id }) =>
        service.receive(id).pipe(
          map((order) => OrderActions.receiveOrderSuccess({ order })),
          catchError((error) =>
            of(OrderActions.receiveOrderFailure({ error: error.error?.message || 'Erreur lors de la réception.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const cancelOrder$ = createEffect(
  (actions$ = inject(Actions), service = inject(OrderService)) =>
    actions$.pipe(
      ofType(OrderActions.cancelOrder),
      mergeMap(({ id }) =>
        service.cancel(id).pipe(
          map(() => OrderActions.cancelOrderSuccess({ id })),
          catchError((error) =>
            of(OrderActions.cancelOrderFailure({ error: error.error?.message || "Erreur lors de l'annulation." }))
          )
        )
      )
    ),
  { functional: true }
);
