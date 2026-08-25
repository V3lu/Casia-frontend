import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';

@Component({
  selector: 'app-expiring-soon',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './expiring-soon.component.html',
  styleUrl: './expiring-soon.component.scss',
})
export class ExpiringSoonComponent {
  readonly inventoryAPIConnector = inject(InventoryAPIConnectorService);
}
