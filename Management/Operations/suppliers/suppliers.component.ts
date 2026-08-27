import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-suppliers',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent {

  readonly summaryTiles = [
    { label: 'Active suppliers', value: '28', note: 'Vendors currently in rotation' },
    { label: 'On-time delivery', value: '94%', note: 'Average across all partners' },
    { label: 'Follow-ups', value: '6', note: 'Open vendor reminders' },
  ];

  readonly detailRows = [
    { name: 'Northline', value: '98% on time', note: 'Best performer this month' },
    { name: 'Green Peak', value: '91% on time', note: 'Stable produce vendor' },
    { name: 'Atlas Foods', value: '87% on time', note: 'Needs routing review' },
  ];

}
