import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-settings',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

  readonly summaryTiles = [
    { label: 'Profiles', value: '6', note: 'Business and environment profiles' },
    { label: 'Rules', value: '18', note: 'Automation and validation rules' },
    { label: 'Pending updates', value: '3', note: 'Items waiting for approval' },
  ];

  readonly detailRows = [
    { name: 'Currency', value: 'USD', note: 'Primary display format' },
    { name: 'Tax region', value: 'Enabled', note: 'Local compliance active' },
    { name: 'Auto-sync', value: 'On', note: 'Background refresh every hour' },
  ];

}
