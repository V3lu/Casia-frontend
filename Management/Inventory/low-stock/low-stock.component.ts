import { Component, inject } from '@angular/core';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';

@Component({
  selector: 'app-low-stock',
  imports: [],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.scss',
})
export class LowStockComponent {
  readonly inventoryAPIConnector = inject(InventoryAPIConnectorService);
}
