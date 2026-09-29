import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { OrdersSummaryResponse } from '../Models';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class OperationsAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.operationsApiUrl;

  getOrdersSummary(): Observable<OrdersSummaryResponse> {
    return this.get<OrdersSummaryResponse>('api/OperationsGet/orders-summary');
  }
}
