import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierState } from './supplier.reducer';

export const selectSupplierState = createFeatureSelector<SupplierState>('supplier');

export const selectAllSuppliers = createSelector(selectSupplierState, (state) => state.suppliers);
export const selectSupplierLoading = createSelector(selectSupplierState, (state) => state.loading);
export const selectSupplierError = createSelector(selectSupplierState, (state) => state.error);
export const selectSupplierCount = createSelector(selectSupplierState, (state) => state.suppliers.length);
