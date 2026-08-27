import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-products',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly summaryTiles = [
    { label: 'Active SKUs', value: '1,245', note: 'Currently visible in catalog' },
    { label: 'New this week', value: '35', note: 'Recently added products' },
    { label: 'Needs review', value: '18', note: 'Missing metadata or images' },
  ];

  readonly detailRows = [
    { name: 'Best seller bundle', value: '98 units', note: 'Top catalog performer' },
    { name: 'Seasonal display', value: '24 units', note: 'Launch prep in progress' },
    { name: 'Accessory line', value: '14 units', note: 'Update pricing copy' },
  ];
}
