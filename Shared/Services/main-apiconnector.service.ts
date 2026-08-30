import { Service } from '@angular/core';
import { environment } from '../Environment';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class MainAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.mainApiUrl;
}
