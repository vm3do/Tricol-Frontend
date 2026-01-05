export interface User {
  id: number;
  email: string;
  fullName: string;
  role?: Role;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: RoleName;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  description: string;
}

export enum RoleName {
  ADMIN = 'ADMIN',
  RESPONSABLE_ACHATS = 'RESPONSABLE_ACHATS',
  MAGASINIER = 'MAGASINIER',
  CHEF_ATELIER = 'CHEF_ATELIER'
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}


