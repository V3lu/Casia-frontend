import { TestBed } from '@angular/core/testing';

import { OperationsAPIConnectorService } from './operations-apiconnector.service';

describe('OperationsAPIConnectorService', () => {
  let service: OperationsAPIConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationsAPIConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
