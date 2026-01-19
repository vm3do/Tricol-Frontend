import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectAllOrders = createSelector(selectOrderState, (state) => state.orders);
export const selectOrderLoading = createSelector(selectOrderState, (state) => state.loading);
export const selectOrderError = createSelector(selectOrderState, (state) => state.error);
export const selectOrderCount = createSelector(selectOrderState, (state) => state.orders.length);
export const selectPendingOrders = createSelector(selectOrderState, (state) =>
  state.orders.filter((o) => o.status === 'PENDING')
);
