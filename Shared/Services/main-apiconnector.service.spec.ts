import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { MainAPIConnectorService } from './main-apiconnector.service';

describe('MainAPIConnectorService', () => {
  let service: MainAPIConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainAPIConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
