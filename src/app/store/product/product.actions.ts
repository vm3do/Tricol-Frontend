import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, ProductCreateRequest, ProductUpdateRequest } from '../../core/models/product.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),

    'Create Product': props<{ product: ProductCreateRequest }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Create Product Failure': props<{ error: string }>(),

    'Update Product': props<{ id: number; product: ProductUpdateRequest }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),

    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});
