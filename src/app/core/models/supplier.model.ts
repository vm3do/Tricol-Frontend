export interface Supplier {
  id: number;
  raisonSociale: string;
  adresse: string;
  ville: string;
  personneContact: string;
  email: string;
  telephone: string;
  ice: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierCreateRequest {
  raisonSociale: string;
  adresse: string;
  ville: string;
  personneContact: string;
  email: string;
  telephone: string;
  ice: string;
}

export interface SupplierUpdateRequest extends SupplierCreateRequest {
  id: number;
}


