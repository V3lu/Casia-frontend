import { Component, inject, OnInit, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SalesSummaryDto } from 'Shared/Models';
import { OperationsAPIConnectorService } from 'Shared/Services/operations-apiconnector.service';

@Component({
  selector: 'app-sales',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  private readonly operationsApiConnector = inject(OperationsAPIConnectorService);

  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  readonly summaryTiles = signal([
    { label: 'Gross sales', value: '$24.5K', note: 'Collected this period' },
    { label: 'Orders', value: '320', note: 'Completed transactions' },
    { label: 'Avg. basket', value: '$76.50', note: 'Average order value' },
  ]);

  readonly detailRows = signal([
    { name: 'Online channel', value: '58%', note: 'Largest sales mix' },
    { name: 'Storefront', value: '29%', note: 'Strong foot traffic' },
    { name: 'Marketplace', value: '13%', note: 'Selective fulfillment' },
  ]);

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.operationsApiConnector.getSalesSummary().subscribe({
      next: (response) => {
        this.applyResponse(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private applyResponse(response: SalesSummaryDto): void {
    const payload = response.data ?? response;
    if (payload.summaryTiles?.length) {
      this.summaryTiles.set(payload.summaryTiles);
    }
    if (payload.detailRows?.length) {
      this.detailRows.set(payload.detailRows);
    }
  }

}
