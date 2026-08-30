import { Service } from '@angular/core';
import { environment } from '../Environment';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class SystemAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.systemApiUrl;
}
