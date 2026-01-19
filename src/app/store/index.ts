import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { SupplierState, supplierReducer } from './supplier/supplier.reducer';
import { ProductState, productReducer } from './product/product.reducer';
import { OrderState, orderReducer } from './order/order.reducer';
import { StockState, stockReducer } from './stock/stock.reducer';

export interface AppState {
  auth: AuthState;
  supplier: SupplierState;
  product: ProductState;
  order: OrderState;
  stock: StockState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  supplier: supplierReducer,
  product: productReducer,
  order: orderReducer,
  stock: stockReducer,
};
