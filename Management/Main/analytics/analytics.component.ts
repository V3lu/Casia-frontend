import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-analytics',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {

  readonly summaryTiles = [
    { label: 'Revenue', value: '$68.4K', note: 'Up from last cycle' },
    { label: 'Orders', value: '1,284', note: 'Across all channels' },
    { label: 'Conversion', value: '7.8%', note: 'Tracked over 30 days' },
  ];

  readonly detailRows = [
    { name: 'Web traffic', value: '42%', note: 'Largest acquisition source' },
    { name: 'Retail traffic', value: '31%', note: 'Strong in-store visits' },
    { name: 'Wholesale', value: '27%', note: 'Stable partner volume' },
  ];

}
