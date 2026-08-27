import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-expiring-soon',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './expiring-soon.component.html',
  styleUrl: './expiring-soon.component.scss',
})
export class ExpiringSoonComponent {
  readonly summaryTiles = [
    { label: 'Due in 7 days', value: '46', note: 'Items need attention soon' },
    { label: 'Critical', value: '9', note: 'Less than 72 hours of shelf life' },
    { label: 'Resolved', value: '12', note: 'Already moved or discounted' },
  ];

  readonly detailRows = [
    { name: 'Dairy', value: '4 days left', note: '12 units pending markdown' },
    { name: 'Fresh produce', value: '2 days left', note: '8 units flagged for review' },
    { name: 'Bakery', value: 'Same day', note: '6 units should be cleared today' },
  ];
}
