export interface Product {
  id: number;
  reference: string;
  name: string;
  description: string;
  unitPrice: number;
  category: string;
  reorderPoint: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateRequest {
  reference: string;
  name: string;
  description: string;
  unitPrice: number;
  category: string;
  reorderPoint: number;
  unit: string;
}

export interface ProductUpdateRequest {
  reference?: string;
  name?: string;
  description?: string;
  unitPrice?: number;
  category?: string;
  reorderPoint?: number;
  unit?: string;
}
