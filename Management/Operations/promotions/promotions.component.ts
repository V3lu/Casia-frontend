import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-promotions',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {

  readonly summaryTiles = [
    { label: 'Active campaigns', value: '5', note: 'Running across channels' },
    { label: 'Engagement', value: '24.6%', note: 'Audience interaction rate' },
    { label: 'CTR', value: '6.1%', note: 'Click-through on creatives' },
  ];

  readonly detailRows = [
    { name: 'Spring bundle', value: '18% off', note: 'Ends in 4 days' },
    { name: 'Clearance push', value: '120 products', note: 'Inventory cleanup focus' },
    { name: 'Loyalty boost', value: '3.2K redemptions', note: 'Best performing segment' },
  ];

}
