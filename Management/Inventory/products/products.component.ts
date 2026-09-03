import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { AddProductRequest, CategoryDto, ProductDto } from 'Shared/Models/inventory.models';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';

type ProductDraft = Partial<ProductDto> & Partial<AddProductRequest>;

@Component({
  selector: 'app-products',
  imports: [
    ToolbarModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    TableModule,
    DialogModule,
    TagModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly inventoryApiConnector = inject(InventoryAPIConnectorService);

  readonly summaryTiles = [
    { label: 'Active SKUs', value: '1,245', note: 'Currently visible in catalog' },
    { label: 'New this week', value: '35', note: 'Recently added products' },
    { label: 'Needs review', value: '18', note: 'Missing metadata or images' },
  ];

  readonly detailRows = [
    { name: 'Best seller bundle', value: '98 units', note: 'Top catalog performer' },
    { name: 'Seasonal display', value: '24 units', note: 'Launch prep in progress' },
    { name: 'Accessory line', value: '14 units', note: 'Update pricing copy' },
  ];

  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = [];
  categories: CategoryDto[] = [];
  readonly searchTerm = signal('');
  readonly showProductDialog = signal(false);
  readonly isEditing = signal(false);
  readonly productDraft = signal<ProductDraft>(this.createEmptyProduct());

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  openNewProduct(): void {
    this.isEditing.set(false);
    this.productDraft.set(this.createEmptyProduct());
    this.showProductDialog.set(true);
  }

  openEditProduct(product: ProductDto): void {
    this.isEditing.set(true);
    this.productDraft.set({
      ...product,
      categoryId: product.categoryId ?? this.categories[0]?.id ?? '',
      stockQuantity: product.stockQuantity ?? 0,
      price: product.price ?? 0,
    });
    this.showProductDialog.set(true);
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
    this.applyFilter();
  }

  closeProductDialog(): void {
    this.showProductDialog.set(false);
  }

  setProductDraftValue(field: keyof ProductDraft, value: string | number): void {
    this.productDraft.update((draft) => ({ ...draft, [field]: value }));
  }

  loadProducts(): void {
    this.inventoryApiConnector.getAllProducts().subscribe({
      next: (products) => {
        this.products = this.normalizeProducts(products);
        this.applyFilter();
      },
      error: () => {
        this.products = this.normalizeProducts(this.getFallbackProducts());
        this.applyFilter();
      },
    });
  }

  loadCategories(): void {
    this.inventoryApiConnector.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.length ? categories : this.getFallbackCategories();
      },
      error: () => {
        this.categories = this.getFallbackCategories();
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm().trim().toLowerCase();
    this.filteredProducts = this.products.filter((product) => {
      if (!term) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(term) ||
        (product.categoryName ?? '').toLowerCase().includes(term) ||
        product.categoryId.toLowerCase().includes(term)
      );
    });
  }

  saveProduct(): void {
    const draft = this.productDraft();
    const name = draft.name?.trim();
    if (!name) {
      return;
    }

    const payload: AddProductRequest = {
      id: draft.id ?? this.generateProductId(),
      name,
      expiryDate: draft.expiryDate ?? new Date().toISOString(),
      categoryId: draft.categoryId ?? this.categories[0]?.id ?? 'uncategorized',
      stockQuantity: Number(draft.stockQuantity ?? 0),
      price: Number(draft.price ?? 0),
    };

    const request$ = (this.isEditing()
      ? this.inventoryApiConnector.updateProduct(payload)
      : this.inventoryApiConnector.addProduct(payload)) as Observable<unknown>;

    request$.subscribe({
      next: () => {
        if (this.isEditing()) {
          this.products = this.products.map((item) => (item.id === payload.id ? this.toProduct(item, payload) : item));
        } else {
          this.products = [this.toProduct({} as ProductDto, payload), ...this.products];
        }

        this.showProductDialog.set(false);
        this.applyFilter();
      },
      error: () => {
        if (this.isEditing()) {
          this.products = this.products.map((item) => (item.id === payload.id ? this.toProduct(item, payload) : item));
        } else {
          this.products = [this.toProduct({} as ProductDto, payload), ...this.products];
        }

        this.showProductDialog.set(false);
        this.applyFilter();
      },
    });
  }

  deleteProduct(productId: string): void {
    this.inventoryApiConnector.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== productId);
        this.applyFilter();
      },
      error: () => {
        this.products = this.products.filter((product) => product.id !== productId);
        this.applyFilter();
      },
    });
  }

  getInventoryStatus(product: ProductDto): string {
    const stock = Number(product.stockQuantity ?? 0);
    const expiryDate = new Date(product.expiryDate);
    const isExpired = !Number.isNaN(expiryDate.getTime()) && expiryDate.getTime() < Date.now();

    if (isExpired) {
      return 'Expired';
    }

    if (stock <= 10) {
      return 'Low stock';
    }

    return 'Healthy';
  }

  getSeverity(product: ProductDto): 'success' | 'warn' | 'danger' | 'info' {
    const status = this.getInventoryStatus(product);
    if (status === 'Healthy') {
      return 'success';
    }

    if (status === 'Low stock') {
      return 'warn';
    }

    return 'danger';
  }

  private getFallbackProducts(): ProductDto[] {
    return [
      {
        id: 'prod-1001',
        name: 'Premium coffee beans',
        expiryDate: '2027-01-15',
        categoryId: 'cat-1',
        stockQuantity: 28,
        price: 18.5,
      },
      {
        id: 'prod-1002',
        name: 'Plasma charger',
        expiryDate: '2026-11-30',
        categoryId: 'cat-2',
        stockQuantity: 7,
        price: 42,
      },
      {
        id: 'prod-1003',
        name: 'Winter gloves',
        expiryDate: '2028-05-08',
        categoryId: 'cat-3',
        stockQuantity: 36,
        price: 26.75,
      },
    ];
  }

  private getFallbackCategories(): CategoryDto[] {
    return [
      { id: 'cat-1', name: 'Beverages', products: [] },
      { id: 'cat-2', name: 'Accessories', products: [] },
      { id: 'cat-3', name: 'Apparel', products: [] },
    ];
  }

  private normalizeProducts(products: ProductDto[]): ProductDto[] {
    return products.map((product) => this.attachMetadata(product));
  }

  private attachMetadata(product: ProductDto): ProductDto {
    const categoryName = this.categories.find((category) => category.id === product.categoryId)?.name ?? 'Unassigned';

    return {
      ...product,
      categoryName,
      stockQuantity: Number(product.stockQuantity ?? 0),
      price: Number(product.price ?? 0),
      status: this.getInventoryStatus(product),
    };
  }

  private createEmptyProduct(): ProductDraft {
    return {
      id: '',
      name: '',
      expiryDate: '',
      categoryId: this.categories[0]?.id ?? '',
      stockQuantity: 0,
      price: 0,
    };
  }

  private generateProductId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `product-${Date.now()}`;
  }

  private toProduct(existing: ProductDto, payload: AddProductRequest): ProductDto {
    const expiryDate = typeof payload.expiryDate === 'string' ? payload.expiryDate : new Date(payload.expiryDate).toISOString();

    return this.attachMetadata({
      ...existing,
      id: existing.id || payload.id || this.generateProductId(),
      name: payload.name,
      expiryDate,
      categoryId: payload.categoryId || existing.categoryId || 'uncategorized',
      stockQuantity: Number(payload.stockQuantity ?? existing.stockQuantity ?? 0),
      price: Number(payload.price ?? existing.price ?? 0),
    });
  }
}
