import { Component, inject, OnInit, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { OperationsAPIConnectorService } from 'Shared/Services/operations-apiconnector.service';
import { PromotionsSummaryDto } from 'Shared/Models';

@Component({
  selector: 'app-promotions',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit {
  private readonly operationsApiConnector = inject(OperationsAPIConnectorService);

  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  readonly summaryTiles = signal([
    { label: 'Active campaigns', value: '5', note: 'Running across channels' },
    { label: 'Engagement', value: '24.6%', note: 'Audience interaction rate' },
    { label: 'CTR', value: '6.1%', note: 'Click-through on creatives' },
  ]);

  readonly detailRows = signal([
    { name: 'Spring bundle', value: '18% off', note: 'Ends in 4 days' },
    { name: 'Clearance push', value: '120 products', note: 'Inventory cleanup focus' },
    { name: 'Loyalty boost', value: '3.2K redemptions', note: 'Best performing segment' },
  ]);

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.operationsApiConnector.getPromotionsSummary().subscribe({
      next: (response) => {
        const payload = response.data ?? response;
        if (payload.summaryTiles?.length) this.summaryTiles.set(payload.summaryTiles);
        if (payload.detailRows?.length) this.detailRows.set(payload.detailRows);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

}
