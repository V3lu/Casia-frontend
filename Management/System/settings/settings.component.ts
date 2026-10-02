import { Component, inject, OnInit, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SettingsSummaryDto } from 'Shared/Models';
import { SystemAPIConnectorService } from 'Shared/Services/system-apiconnector.service';

@Component({
  selector: 'app-settings',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private readonly systemApiConnector = inject(SystemAPIConnectorService);

  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  readonly summaryTiles = signal([
    { label: 'Profiles', value: '6', note: 'Business and environment profiles' },
    { label: 'Rules', value: '18', note: 'Automation and validation rules' },
    { label: 'Pending updates', value: '3', note: 'Items waiting for approval' },
  ]);

  readonly detailRows = signal([
    { name: 'Currency', value: 'USD', note: 'Primary display format' },
    { name: 'Tax region', value: 'Enabled', note: 'Local compliance active' },
    { name: 'Auto-sync', value: 'On', note: 'Background refresh every hour' },
  ]);

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.systemApiConnector.getSettingsSummary().subscribe({
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
