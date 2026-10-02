import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { NotificationsResponse, SettingsSummaryDto, StaffSummaryDto } from '../Models';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class SystemAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.systemApiUrl;

  getNotifications(): Observable<NotificationsResponse> {
    return this.get<NotificationsResponse>('api/SystemGet/notifications');
  }

  getStaffSummary(): Observable<StaffSummaryDto> {
    return this.get<StaffSummaryDto>('api/SystemGet/staff-summary');
  }

  getSettingsSummary(): Observable<SettingsSummaryDto> {
    return this.get<SettingsSummaryDto>('api/SystemGet/settings-summary');
  }
}
