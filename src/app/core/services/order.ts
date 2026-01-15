import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SupplierOrder,
  SupplierOrderRequest,
  SupplierOrderUpdate,
} from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/v1/orders`;

  getAll(): Observable<SupplierOrder[]> {
    return this.http.get<SupplierOrder[]>(this.apiUrl);
  }

  getById(id: number): Observable<SupplierOrder> {
    return this.http.get<SupplierOrder>(`${this.apiUrl}/${id}`);
  }

  create(order: SupplierOrderRequest): Observable<SupplierOrder> {
    return this.http.post<SupplierOrder>(this.apiUrl, order);
  }

  update(id: number, order: SupplierOrderUpdate): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.apiUrl}/${id}`, order);
  }

  validate(id: number): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.apiUrl}/${id}/validate`, {});
  }

  receive(id: number): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.apiUrl}/${id}/receive`, {});
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBySupplier(supplierId: number): Observable<SupplierOrder[]> {
    return this.http.get<SupplierOrder[]>(`${this.apiUrl}/supplier/${supplierId}`);
  }
}
