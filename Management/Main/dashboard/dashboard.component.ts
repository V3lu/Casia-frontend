import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import type { ChartData, ChartOptions } from 'chart.js';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { CurrentUserService } from 'Shared/Services/current-user.service';
import { InventoryAPIConnectorService } from 'Shared/Services/inventory-apiconnector.service';
import { MainAPIConnectorService } from 'Shared/Services/main-apiconnector.service';
import { OperationsAPIConnectorService } from 'Shared/Services/operations-apiconnector.service';
import { SystemAPIConnectorService } from 'Shared/Services/system-apiconnector.service';
import { AnalyticsReportDto, DashboardSummaryDto, NotificationsResponse, OrdersSummaryResponse, ProductDto } from 'Shared/Models';

type SummaryCard = {
  title: string;
  value: string;
  change: string;
  icon: string;
  positive: boolean;
  warning?: boolean;
  chartData: ChartData<'line'>;
};

@Component({
  selector: 'app-dashboard',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, DatePickerModule, ChartModule, TableModule, TagModule, AvatarModule, DividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);
  private readonly inventoryApiConnector = inject(InventoryAPIConnectorService);
  private readonly mainApiConnector = inject(MainAPIConnectorService);
  private readonly operationsApiConnector = inject(OperationsAPIConnectorService);
  private readonly systemApiConnector = inject(SystemAPIConnectorService);

  readonly quickActions = [
    { label: 'View analytics', icon: 'pi pi-chart-line', action: () => this.openAnalytics() },
    { label: 'Manage products', icon: 'pi pi-box', action: () => this.openProducts() },
    { label: 'Review low stock', icon: 'pi pi-exclamation-triangle', action: () => this.openLowStock() },
    { label: 'Check orders', icon: 'pi pi-shopping-cart', action: () => this.openOrders() },
  ];

  refreshDashboard(): void {
    this.mainApiConnector.getDashboardSummary().subscribe();
  }

  openNotifications(): void {
    this.systemApiConnector.getNotifications().subscribe();
  }

  openAnalytics(): void {
    this.runAndNavigate(this.mainApiConnector.getAnalyticsReport(), '/Analytics');
  }

  openProducts(): void {
    this.runAndNavigate(this.inventoryApiConnector.getAllProducts(), '/Products');
  }

  openLowStock(): void {
    this.runAndNavigate(this.inventoryApiConnector.getLowStockProducts(), '/Low-stock');
  }

  openOrders(): void {
    this.runAndNavigate(this.operationsApiConnector.getOrdersSummary(), '/Orders');
  }

  openReport(): void {
    this.openAnalytics();
  }

  private runAndNavigate(
    request$: Observable<DashboardSummaryDto | AnalyticsReportDto | ProductDto[] | OrdersSummaryResponse | NotificationsResponse>,
    route: string,
  ): void {
    request$.subscribe({
      next: () => this.router.navigateByUrl(route),
      error: () => this.router.navigateByUrl(route),
    });
  }

  readonly sparklineUpData: ChartData<'line'> = {
    labels: ['', '', '', '', '', '', '', ''],
    datasets: [
      {
        data: [6, 12, 9, 14, 13, 17, 16, 20],
        borderColor: '#5fe0a4',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#5fe0a4',
        pointBorderColor: '#eafff5',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 2,
        tension: 0.5,
        fill: false,
      },
    ],
  };

  readonly sparklineDownData: ChartData<'line'> = {
    labels: ['', '', '', '', '', '', '', ''],
    datasets: [
      {
        data: [20, 18, 19, 16, 15, 13, 12, 10],
        borderColor: '#ffb447',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#ffb447',
        pointBorderColor: '#fff2db',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 2,
        tension: 0.5,
        fill: false,
      },
    ],
  };

  readonly summaryCards: SummaryCard[] = [
    {
      title: 'Total Sales',
      value: '$24,530.50',
      change: '+18.6% vs last week',
      icon: 'pi pi-send',
      positive: true,
      chartData: this.sparklineUpData,
    },
    {
      title: 'Total Orders',
      value: '320',
      change: '+12.4% vs last week',
      icon: 'pi pi-clipboard',
      positive: true,
      chartData: this.sparklineUpData,
    },
    {
      title: 'Total Products',
      value: '1,245',
      change: '+8.7% vs last week',
      icon: 'pi pi-box',
      positive: true,
      chartData: this.sparklineUpData,
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-6.3% vs last week',
      icon: 'pi pi-exclamation-triangle',
      positive: false,
      warning: true,
      chartData: this.sparklineDownData,
    },
  ];

  readonly recentActivity = [
    { action: 'New order #4821', status: 'Completed', severity: 'success' },
    { action: 'Inventory synced', status: 'Updated', severity: 'info' },
    { action: 'Low stock alert', status: 'Needs review', severity: 'warn' },
    { action: 'Supplier payment approved', status: 'Approved', severity: 'success' },
  ];

  readonly revenueChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1800, 1500, 2400, 2200, 2800, 3000],
        borderColor: '#5fe0a4',
        backgroundColor: 'rgba(95, 224, 164, 0.16)',
        pointBackgroundColor: '#5fe0a4',
        pointBorderColor: '#ffffff',
        pointRadius: 3,
        pointHoverRadius: 4,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  readonly chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f1720',
        titleColor: '#e5fdf0',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#7b8794' },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
      y: {
        ticks: { color: '#7b8794' },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
    },
  };

  readonly sparklineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    scales: {
      x: {
        display: false,
        ticks: { display: false },
        grid: { display: false },
      },
      y: {
        display: false,
        ticks: { display: false },
        grid: { display: false },
      },
    },
  };
}
