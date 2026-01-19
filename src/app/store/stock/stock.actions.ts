import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StockSummary, StockMovement } from '../../core/models/stock.model';

export const StockActions = createActionGroup({
  source: 'Stock',
  events: {
    'Load Summary': emptyProps(),
    'Load Summary Success': props<{ summary: StockSummary }>(),
    'Load Summary Failure': props<{ error: string }>(),

    'Load Movements': emptyProps(),
    'Load Movements Success': props<{ movements: StockMovement[] }>(),
    'Load Movements Failure': props<{ error: string }>(),
  },
});
