import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import {
  OrdersSummaryResponse,
  PromotionsSummaryDto,
  SalesSummaryDto,
  SuppliersSummaryDto,
} from '../Models';
import { ApiConnectorBaseService } from './api-connector-base.service';

@Service()
export class OperationsAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.operationsApiUrl;

  getOrdersSummary(): Observable<OrdersSummaryResponse> {
    return this.get<OrdersSummaryResponse>('api/OperationsGet/orders-summary');
  }

  getSalesSummary(): Observable<SalesSummaryDto> {
    return this.get<SalesSummaryDto>('api/OperationsGet/sales-summary');
  }

  getSuppliersSummary(): Observable<SuppliersSummaryDto> {
    return this.get<SuppliersSummaryDto>('api/OperationsGet/suppliers-summary');
  }

  getPromotionsSummary(): Observable<PromotionsSummaryDto> {
    return this.get<PromotionsSummaryDto>('api/OperationsGet/promotions-summary');
  }
}
