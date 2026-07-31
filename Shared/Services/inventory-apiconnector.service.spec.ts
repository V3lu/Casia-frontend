import { TestBed } from '@angular/core/testing';

import { InventoryAPIConnectorService } from './inventory-apiconnector.service';

describe('InventoryAPIConnectorService', () => {
  let service: InventoryAPIConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryAPIConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
