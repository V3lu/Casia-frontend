import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-categories',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  readonly summaryTiles = [
    { label: 'Total groups', value: '18', note: '14 active collections' },
    { label: 'Listed SKUs', value: '1,245', note: '92% mapped to categories' },
    { label: 'Needs review', value: '4', note: 'Unassigned or duplicated' },
  ];

  readonly detailRows = [
    { name: 'Apparel', value: '8 subcategories', note: 'Highest catalog depth' },
    { name: 'Beverages', value: '5 linked collections', note: 'Stable across channels' },
    { name: 'Seasonal', value: '3 launches queued', note: 'Review before Friday' },
  ];
}
