import { createReducer, on } from '@ngrx/store';
import { SupplierActions } from './supplier.actions';
import { Supplier } from '../../core/models/supplier.model';

export interface SupplierState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

export const initialSupplierState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
};

export const supplierReducer = createReducer(
  initialSupplierState,

  on(SupplierActions.loadSuppliers, (state) => ({ ...state, loading: true, error: null })),
  on(SupplierActions.loadSuppliersSuccess, (state, { suppliers }) => ({
    ...state,
    suppliers,
    loading: false,
  })),
  on(SupplierActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SupplierActions.createSupplier, (state) => ({ ...state, loading: true, error: null })),
  on(SupplierActions.createSupplierSuccess, (state, { supplier }) => ({
    ...state,
    suppliers: [...state.suppliers, supplier],
    loading: false,
  })),
  on(SupplierActions.createSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SupplierActions.updateSupplier, (state) => ({ ...state, loading: true, error: null })),
  on(SupplierActions.updateSupplierSuccess, (state, { supplier }) => ({
    ...state,
    suppliers: state.suppliers.map((s) => (s.id === supplier.id ? supplier : s)),
    loading: false,
  })),
  on(SupplierActions.updateSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SupplierActions.deleteSupplier, (state) => ({ ...state, loading: true, error: null })),
  on(SupplierActions.deleteSupplierSuccess, (state, { id }) => ({
    ...state,
    suppliers: state.suppliers.filter((s) => s.id !== id),
    loading: false,
  })),
  on(SupplierActions.deleteSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
