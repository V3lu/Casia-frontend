import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class MainAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.mainApiUrl;

  getDashboardSummary(): Observable<unknown> {
    return this.get<unknown>('api/MainGet/dashboard-summary');
  }

  getAnalyticsReport(): Observable<unknown> {
    return this.get<unknown>('api/MainGet/analytics-report');
  }
}
