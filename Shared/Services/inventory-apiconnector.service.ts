import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment';
import { ApiConnectorBaseService } from './api-connector-base.service';
import {
  AddCategoryRequest,
  AddProductRequest,
  CategoryDto,
  CommandResponse,
  ProductDto,
} from '../Models/inventory.models';

@Service()
export class InventoryAPIConnectorService extends ApiConnectorBaseService {
  protected readonly baseUrl = environment.inventoryApiUrl;

  getAllProducts(): Observable<ProductDto[]> {
    return this.get<ProductDto[]>('api/InventoryGet/products');
  }

  getProductById(id: string): Observable<ProductDto> {
    return this.get<ProductDto>(`api/InventoryGet/products/${id}`);
  }

  getAllCategories(): Observable<CategoryDto[]> {
    return this.get<CategoryDto[]>('api/InventoryGet/categories');
  }

  getCategoryById(id: string): Observable<CategoryDto> {
    return this.get<CategoryDto>(`api/InventoryGet/categories/${id}`);
  }

  addProduct(request: AddProductRequest): Observable<CommandResponse<string>> {
    return this.post<CommandResponse<string>, AddProductRequest>('api/InventoryPost/addProduct', request);
  }

  addCategory(request: AddCategoryRequest): Observable<CommandResponse<CategoryDto>> {
    return this.post<CommandResponse<CategoryDto>, AddCategoryRequest>('api/InventoryPost/addCategory', request);
  }
}
