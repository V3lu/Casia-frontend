import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class SystemAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.systemApiUrl;

  getNotifications(): Observable<unknown> {
    return this.get<unknown>('api/SystemGet/notifications');
  }
}
