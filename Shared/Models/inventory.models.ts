export interface ProductDto {
  id: string;
  name: string;
  expiryDate: string;
  categoryId: string;
  categoryName?: string;
  stockQuantity?: number;
  price?: number;
  status?: string;
}

export interface CategoryDto {
  id: string;
  name: string;
  products: ProductDto[];
}

export interface AddProductRequest {
  id?: string;
  name: string;
  expiryDate: string | Date;
  categoryId?: string;
  stockQuantity?: number;
  price?: number;
}

export interface AddCategoryRequest {
  id: string;
  name: string;
  products?: ProductDto[] | null;
}

export interface CommandResponse<T> {
  response: T | null;
}