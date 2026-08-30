export interface ProductDto {
  id: string;
  name: string;
  expiryDate: string;
  categoryId: string;
}

export interface CategoryDto {
  id: string;
  name: string;
  products: ProductDto[];
}

export interface AddProductRequest {
  id: string;
  name: string;
  expiryDate: string | Date;
}

export interface AddCategoryRequest {
  id: string;
  name: string;
  products?: ProductDto[] | null;
}

export interface CommandResponse<T> {
  response: T | null;
}