import { Product } from './product.model';

// Stock summary
export interface StockItem {
  productId: number;
  productReference: string;
  productName: string;
  currentStock: number;
  stockValue: number;
  isLowStock: boolean;
}

export interface StockSummary {
  stocks: StockItem[];
  totalValue: number;
  alerts: Product[];
  totalProducts: number;
  alertCount: number;
}

// Stock movements
export type MovementType = 'ENTREE' | 'SORTIE';

export interface StockMovement {
  id: number;
  product: Product;
  type: MovementType;
  quantity: number;
  lotNumber: string;
  movementDate: string;
  reference: string;
  notes?: string;
}

// Stock outbound
export type OutboundReason = 'PRODUCTION' | 'MAINTENANCE' | 'OTHER';
export type OutboundStatus = 'DRAFT' | 'VALIDATED' | 'CANCELLED';

export interface StockOutbound {
  id: number;
  reference: string;
  reason: OutboundReason;
  status: OutboundStatus;
  workshop: string;
  notes?: string;
  items: StockOutboundItem[];
  createdAt: string;
  updatedAt: string;
}

export interface StockOutboundItem {
  id: number;
  product: Product;
  quantity: number;
  notes?: string;
}

export interface StockOutboundRequest {
  reason: OutboundReason;
  workshop: string;
  notes?: string;
  items: StockOutboundItemRequest[];
}

export interface StockOutboundItemRequest {
  productId: number;
  quantity: number;
  notes?: string;
}

export interface StockOutboundUpdate {
  reason?: OutboundReason;
  workshop?: string;
  notes?: string;
  items?: StockOutboundItemRequest[];
}
