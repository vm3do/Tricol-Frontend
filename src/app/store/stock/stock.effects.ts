import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { StockActions } from './stock.actions';
import { StockService } from '../../core/services/stock';

export const loadSummary$ = createEffect(
  (actions$ = inject(Actions), service = inject(StockService)) =>
    actions$.pipe(
      ofType(StockActions.loadSummary),
      mergeMap(() =>
        service.getSummary().pipe(
          map((summary) => StockActions.loadSummarySuccess({ summary })),
          catchError((error) =>
            of(StockActions.loadSummaryFailure({ error: error.error?.message || 'Erreur de chargement.' }))
          )
        )
      )
    ),
  { functional: true }
);

export const loadMovements$ = createEffect(
  (actions$ = inject(Actions), service = inject(StockService)) =>
    actions$.pipe(
      ofType(StockActions.loadMovements),
      mergeMap(() =>
        service.getMovements().pipe(
          map((movements) => StockActions.loadMovementsSuccess({ movements })),
          catchError((error) =>
            of(StockActions.loadMovementsFailure({ error: error.error?.message || 'Erreur de chargement.' }))
          )
        )
      )
    ),
  { functional: true }
);
