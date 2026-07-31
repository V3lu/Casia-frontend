import { TestBed } from '@angular/core/testing';

import { SystemAPIConnectorService } from './system-apiconnector.service';

describe('SystemAPIConnectorService', () => {
  let service: SystemAPIConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAPIConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
