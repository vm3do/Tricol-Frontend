import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Product } from '../../core/models/product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialProductState,

  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProductActions.createProduct, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.createProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
  })),
  on(ProductActions.createProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProductActions.updateProduct, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
    loading: false,
  })),
  on(ProductActions.updateProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProductActions.deleteProduct, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((p) => p.id !== id),
    loading: false,
  })),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
