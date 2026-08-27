import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-sales',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {

  readonly summaryTiles = [
    { label: 'Gross sales', value: '$24.5K', note: 'Collected this period' },
    { label: 'Orders', value: '320', note: 'Completed transactions' },
    { label: 'Avg. basket', value: '$76.50', note: 'Average order value' },
  ];

  readonly detailRows = [
    { name: 'Online channel', value: '58%', note: 'Largest sales mix' },
    { name: 'Storefront', value: '29%', note: 'Strong foot traffic' },
    { name: 'Marketplace', value: '13%', note: 'Selective fulfillment' },
  ];

}
