import { createReducer, on } from '@ngrx/store';
import { StockActions } from './stock.actions';
import { StockSummary, StockMovement } from '../../core/models/stock.model';

export interface StockState {
  summary: StockSummary | null;
  movements: StockMovement[];
  loading: boolean;
  error: string | null;
}

export const initialStockState: StockState = {
  summary: null,
  movements: [],
  loading: false,
  error: null,
};

export const stockReducer = createReducer(
  initialStockState,

  on(StockActions.loadSummary, (state) => ({ ...state, loading: true, error: null })),
  on(StockActions.loadSummarySuccess, (state, { summary }) => ({ ...state, summary, loading: false })),
  on(StockActions.loadSummaryFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(StockActions.loadMovements, (state) => ({ ...state, loading: true, error: null })),
  on(StockActions.loadMovementsSuccess, (state, { movements }) => ({ ...state, movements, loading: false })),
  on(StockActions.loadMovementsFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
