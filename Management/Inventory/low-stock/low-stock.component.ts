import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-low-stock',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.scss',
})
export class LowStockComponent {
  readonly summaryTiles = [
    { label: 'Below target', value: '31', note: 'Products under threshold' },
    { label: 'Reorder queue', value: '12', note: 'Ready for purchase orders' },
    { label: 'Urgent', value: '7', note: 'Needs action today' },
  ];

  readonly detailRows = [
    { name: 'Disinfectant spray', value: '18 short', note: 'Fastest-moving shortage' },
    { name: 'Thermal labels', value: '9 short', note: 'Support tickets affected' },
    { name: 'Return bags', value: '6 short', note: 'Reserve stock now' },
  ];
}
