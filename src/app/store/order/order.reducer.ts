import { createReducer, on } from '@ngrx/store';
import { OrderActions } from './order.actions';
import { SupplierOrder } from '../../core/models/order.model';

export interface OrderState {
  orders: SupplierOrder[];
  loading: boolean;
  error: string | null;
}

export const initialOrderState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = createReducer(
  initialOrderState,

  on(OrderActions.loadOrders, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({ ...state, orders, loading: false })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(OrderActions.createOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    loading: false,
  })),
  on(OrderActions.createOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(OrderActions.validateOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.validateOrderSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map((o) => (o.id === order.id ? order : o)),
    loading: false,
  })),
  on(OrderActions.validateOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(OrderActions.receiveOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.receiveOrderSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map((o) => (o.id === order.id ? order : o)),
    loading: false,
  })),
  on(OrderActions.receiveOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(OrderActions.cancelOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.cancelOrderSuccess, (state, { id }) => ({
    ...state,
    orders: state.orders.filter((o) => o.id !== id),
    loading: false,
  })),
  on(OrderActions.cancelOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
