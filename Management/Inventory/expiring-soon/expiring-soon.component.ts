import { Component, inject } from '@angular/core';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';

@Component({
  selector: 'app-expiring-soon',
  imports: [],
  templateUrl: './expiring-soon.component.html',
  styleUrl: './expiring-soon.component.scss',
})
export class ExpiringSoonComponent {
  readonly inventoryAPIConnector = inject(InventoryAPIConnectorService);
}
