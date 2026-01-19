import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockState } from './stock.reducer';

export const selectStockState = createFeatureSelector<StockState>('stock');

export const selectStockSummary = createSelector(selectStockState, (state) => state.summary);
export const selectStockMovements = createSelector(selectStockState, (state) => state.movements);
export const selectStockLoading = createSelector(selectStockState, (state) => state.loading);
export const selectStockError = createSelector(selectStockState, (state) => state.error);
export const selectAlertCount = createSelector(selectStockState, (state) => state.summary?.alertCount ?? 0);
