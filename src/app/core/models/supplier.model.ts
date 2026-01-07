export interface Supplier {
  id: number;
  companyName: string;
  address: string;
  city: string;
  contactPerson: string;
  email: string;
  phone: string;
  ice: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierCreateRequest {
  companyName: string;
  address: string;
  city: string;
  contactPerson: string;
  email: string;
  phone: string;
  ice: string;
}

export interface SupplierUpdateRequest extends SupplierCreateRequest {
  id: number;
}



