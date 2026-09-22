import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class OperationsAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.operationsApiUrl;

  getOrdersSummary(): Observable<unknown> {
    return this.get<unknown>('api/OperationsGet/orders-summary');
  }
}
