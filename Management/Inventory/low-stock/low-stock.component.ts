import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';

@Component({
  selector: 'app-low-stock',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.scss',
})
export class LowStockComponent {
  readonly inventoryAPIConnector = inject(InventoryAPIConnectorService);
}
