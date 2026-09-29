import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { NotificationsResponse } from '../Models';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class SystemAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.systemApiUrl;

  getNotifications(): Observable<NotificationsResponse> {
    return this.get<NotificationsResponse>('api/SystemGet/notifications');
  }
}
