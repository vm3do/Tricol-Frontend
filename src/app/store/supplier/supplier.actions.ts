import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Supplier, SupplierCreateRequest, SupplierUpdateRequest } from '../../core/models/supplier.model';

export const SupplierActions = createActionGroup({
  source: 'Supplier',
  events: {
    'Load Suppliers': emptyProps(),
    'Load Suppliers Success': props<{ suppliers: Supplier[] }>(),
    'Load Suppliers Failure': props<{ error: string }>(),

    'Create Supplier': props<{ supplier: SupplierCreateRequest }>(),
    'Create Supplier Success': props<{ supplier: Supplier }>(),
    'Create Supplier Failure': props<{ error: string }>(),

    'Update Supplier': props<{ id: number; supplier: SupplierUpdateRequest }>(),
    'Update Supplier Success': props<{ supplier: Supplier }>(),
    'Update Supplier Failure': props<{ error: string }>(),

    'Delete Supplier': props<{ id: number }>(),
    'Delete Supplier Success': props<{ id: number }>(),
    'Delete Supplier Failure': props<{ error: string }>(),
  },
});
