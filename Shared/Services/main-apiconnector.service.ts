import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { AnalyticsReportDto, DashboardSummaryDto } from '../Models';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class MainAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.mainApiUrl;

  getDashboardSummary(): Observable<DashboardSummaryDto> {
    return this.get<DashboardSummaryDto>('api/MainGet/dashboard-summary');
  }

  getAnalyticsReport(): Observable<AnalyticsReportDto> {
    return this.get<AnalyticsReportDto>('api/MainGet/analytics-report');
  }
}
