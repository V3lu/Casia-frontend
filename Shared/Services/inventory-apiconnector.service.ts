import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class InventoryAPIConnectorService {
  readonly http = inject(HttpClient);
}
