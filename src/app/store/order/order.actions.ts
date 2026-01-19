import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SupplierOrder, SupplierOrderRequest } from '../../core/models/order.model';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders': emptyProps(),
    'Load Orders Success': props<{ orders: SupplierOrder[] }>(),
    'Load Orders Failure': props<{ error: string }>(),

    'Create Order': props<{ order: SupplierOrderRequest }>(),
    'Create Order Success': props<{ order: SupplierOrder }>(),
    'Create Order Failure': props<{ error: string }>(),

    'Validate Order': props<{ id: number }>(),
    'Validate Order Success': props<{ order: SupplierOrder }>(),
    'Validate Order Failure': props<{ error: string }>(),

    'Receive Order': props<{ id: number }>(),
    'Receive Order Success': props<{ order: SupplierOrder }>(),
    'Receive Order Failure': props<{ error: string }>(),

    'Cancel Order': props<{ id: number }>(),
    'Cancel Order Success': props<{ id: number }>(),
    'Cancel Order Failure': props<{ error: string }>(),
  },
});
