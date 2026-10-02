import { Component, inject, OnInit, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SuppliersSummaryDto } from 'Shared/Models';
import { OperationsAPIConnectorService } from 'Shared/Services/operations-apiconnector.service';

@Component({
  selector: 'app-suppliers',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent implements OnInit {
  private readonly operationsApiConnector = inject(OperationsAPIConnectorService);

  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  readonly summaryTiles = signal([
    { label: 'Active suppliers', value: '28', note: 'Vendors currently in rotation' },
    { label: 'On-time delivery', value: '94%', note: 'Average across all partners' },
    { label: 'Follow-ups', value: '6', note: 'Open vendor reminders' },
  ]);

  readonly detailRows = signal([
    { name: 'Northline', value: '98% on time', note: 'Best performer this month' },
    { name: 'Green Peak', value: '91% on time', note: 'Stable produce vendor' },
    { name: 'Atlas Foods', value: '87% on time', note: 'Needs routing review' },
  ]);

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.operationsApiConnector.getSuppliersSummary().subscribe({
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
