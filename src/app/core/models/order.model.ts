import { Supplier } from './supplier.model';
import { Product } from './product.model';

export type OrderStatus = 'PENDING' | 'VALIDATED' | 'DELIVERED' | 'CANCELLED';

export interface SupplierOrder {
  id: number;
  supplier: Supplier;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  items: SupplierOrderItem[];
}

export interface SupplierOrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface SupplierOrderRequest {
  supplierId: number;
  orderDate: string;
  items: SupplierOrderItemRequest[];
}

export interface SupplierOrderItemRequest {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface SupplierOrderUpdate {
  orderDate?: string;
  items?: SupplierOrderItemRequest[];
}
