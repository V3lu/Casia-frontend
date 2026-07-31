import { Component, inject } from '@angular/core';
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
