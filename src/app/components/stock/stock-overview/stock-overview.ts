import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { StockActions } from '../../../store/stock/stock.actions';
import { selectStockSummary, selectStockLoading } from '../../../store/stock/stock.selectors';

@Component({
  selector: 'app-stock-overview',
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './stock-overview.html',
  styleUrl: './stock-overview.css',
})
export class StockOverviewComponent implements OnInit {
  private readonly store = inject(Store);

  summary$ = this.store.select(selectStockSummary);
  loading$ = this.store.select(selectStockLoading);

  ngOnInit(): void {
    this.store.dispatch(StockActions.loadSummary());
  }
}
