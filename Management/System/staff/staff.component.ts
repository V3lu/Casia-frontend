import { Component, inject, OnInit, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { StaffSummaryDto } from 'Shared/Models';
import { SystemAPIConnectorService } from 'Shared/Services/system-apiconnector.service';

@Component({
  selector: 'app-staff',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
  private readonly systemApiConnector = inject(SystemAPIConnectorService);

  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  readonly summaryTiles = signal([
    { label: 'Active members', value: '24', note: 'Staff currently assigned' },
    { label: 'On shift', value: '14', note: 'Working this rotation' },
    { label: 'Open roles', value: '3', note: 'Positions ready to fill' },
  ]);

  readonly detailRows = signal([
    { name: 'Warehouse', value: '100% staffed', note: 'Full coverage today' },
    { name: 'Admin', value: '2 on leave', note: 'Temporary coverage in place' },
    { name: 'Weekend', value: '91% ready', note: 'Coverage check pending' },
  ]);

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.systemApiConnector.getStaffSummary().subscribe({
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
