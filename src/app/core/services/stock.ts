import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  StockSummary,
  StockMovement,
  StockOutbound,
  StockOutboundRequest,
  StockOutboundUpdate,
} from '../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly http = inject(HttpClient);
  private readonly stockUrl = `${environment.apiUrl}/v1/stock`;
  private readonly outboundUrl = `${environment.apiUrl}/stock-outbound`;

  // Stock summary
  getSummary(): Observable<StockSummary> {
    return this.http.get<StockSummary>(this.stockUrl);
  }

  // Stock movements
  getMovements(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.stockUrl}/movements`);
  }

  searchMovements(filters: {
    productId?: number;
    type?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<StockMovement[]> {
    let params = new HttpParams();
    if (filters.productId) params = params.set('productId', filters.productId.toString());
    if (filters.type) params = params.set('type', filters.type);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);
    return this.http.get<StockMovement[]>(`${this.stockUrl}/movements/search`, { params });
  }

  getAlerts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.stockUrl}/alerts`);
  }

  // Stock outbound
  getOutbounds(): Observable<StockOutbound[]> {
    return this.http.get<StockOutbound[]>(this.outboundUrl);
  }

  getOutboundById(id: number): Observable<StockOutbound> {
    return this.http.get<StockOutbound>(`${this.outboundUrl}/${id}`);
  }

  createOutbound(data: StockOutboundRequest): Observable<StockOutbound> {
    return this.http.post<StockOutbound>(this.outboundUrl, data);
  }

  updateOutbound(id: number, data: StockOutboundUpdate): Observable<StockOutbound> {
    return this.http.put<StockOutbound>(`${this.outboundUrl}/${id}`, data);
  }

  validateOutbound(id: number): Observable<StockOutbound> {
    return this.http.put<StockOutbound>(`${this.outboundUrl}/${id}/validate`, {});
  }

  cancelOutbound(id: number): Observable<StockOutbound> {
    return this.http.put<StockOutbound>(`${this.outboundUrl}/${id}/cancel`, {});
  }
}
