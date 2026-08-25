import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';

@Component({
  selector: 'app-categories',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  readonly inventoryAPIConnector = inject(InventoryAPIConnectorService);
}
