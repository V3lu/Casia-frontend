import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne((request) => request.url.includes('api/OperationsGet/orders-summary')).flush({
      pending: 2,
      shipped: 4,
      returns: 1,
      orders: [{ id: '1001', customerName: 'Test customer', status: 'Shipped', totalAmount: 25 }],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads and filters orders from the operations API', () => {
    expect(component.summary().shipped).toBe(4);
    expect(component.orders()).toHaveLength(1);

    component.setSearchTerm('test customer');

    expect(component.filteredOrders()).toHaveLength(1);
  });
});
