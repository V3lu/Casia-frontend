import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { OrderDto, OrdersSummaryDto, OrdersSummaryResponse } from 'Shared/Models';
import { OperationsAPIConnectorService } from 'Shared/Services/operations-apiconnector.service';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Returned';

type OrderRecord = {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
  updatedAt: string;
};

@Component({
  selector: 'app-orders',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule, TableModule, TagModule, CurrencyPipe, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly operationsApiConnector = inject(OperationsAPIConnectorService);

  readonly orders = signal<OrderRecord[]>([]);
  readonly searchTerm = signal('');
  readonly isLoading = signal(true);
  readonly hasError = signal(false);
  readonly summary = signal({ pending: 0, shipped: 0, returns: 0 });

  readonly filteredOrders = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.orders();
    }

    return this.orders().filter((order) =>
      [order.id, order.customer, order.status].some((value) => value.toLowerCase().includes(term)),
    );
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.operationsApiConnector.getOrdersSummary().subscribe({
      next: (response) => {
        this.applyResponse(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.orders.set(this.getFallbackOrders());
        this.summary.set({ pending: 42, shipped: 186, returns: 11 });
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  getSeverity(status: OrderStatus): 'success' | 'info' | 'warn' | 'danger' {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Shipped':
        return 'info';
      case 'Returned':
        return 'danger';
      default:
        return 'warn';
    }
  }

  private applyResponse(response: OrdersSummaryResponse): void {
    const payload = this.asOrdersResponse(response);
    const rawOrders = payload.orders ?? payload.data?.orders ?? [];
    const orders = rawOrders.map((order, index) => this.normalizeOrder(order, index)).filter((order): order is OrderRecord => order !== null);

    this.orders.set(orders.length ? orders : this.getFallbackOrders());
    this.summary.set({
      pending: this.toNumber(payload.pending, orders.filter((order) => order.status === 'Pending').length),
      shipped: this.toNumber(payload.shipped, orders.filter((order) => order.status === 'Shipped').length),
      returns: this.toNumber(payload.returns, orders.filter((order) => order.status === 'Returned').length),
    });
  }

  private asOrdersResponse(response: OrdersSummaryResponse): OrdersSummaryDto {
    if (Array.isArray(response)) {
      return { orders: response };
    }

    return response;
  }

  private normalizeOrder(order: OrderDto, index: number): OrderRecord | null {
    const status = this.normalizeStatus(order['status'] ?? order['orderStatus']);
    return {
      id: String(order.id ?? order.orderId ?? `#${4800 + index}`),
      customer: String(order.customer ?? order.customerName ?? 'Customer'),
      status,
      total: this.toNumber(order.total ?? order.totalAmount ?? order.amount, 0),
      updatedAt: String(order.updatedAt ?? order.createdAt ?? new Date().toISOString()),
    };
  }

  private normalizeStatus(value: unknown): OrderStatus {
    const status = String(value ?? 'Pending').toLowerCase();
    if (status.includes('return')) return 'Returned';
    if (status.includes('deliver') || status.includes('complete')) return 'Delivered';
    if (status.includes('ship')) return 'Shipped';
    return 'Pending';
  }

  private toNumber(value: unknown, fallback: number): number {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  private getFallbackOrders(): OrderRecord[] {
    return [
      { id: '#4821', customer: 'Maya Chen', status: 'Delivered', total: 148.5, updatedAt: '2026-09-28T09:30:00Z' },
      { id: '#4820', customer: 'Jon Bell', status: 'Shipped', total: 86.25, updatedAt: '2026-09-28T08:15:00Z' },
      { id: '#4819', customer: 'Ava Patel', status: 'Pending', total: 214.0, updatedAt: '2026-09-27T17:45:00Z' },
      { id: '#4818', customer: 'Noah Williams', status: 'Returned', total: 62.75, updatedAt: '2026-09-27T15:20:00Z' },
    ];
  }

}
