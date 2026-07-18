import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { CurrentUserService } from 'Shared/Services/current-user.service';
import { DashboardDataService } from 'Shared/Services/dashboard-data.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'node_modules/chart.js/dist/types';

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective, AvatarModule, ButtonModule, ToolbarModule, MenuModule, PanelModule, DividerModule, SplitterModule, CardModule, FloatLabelModule, IconFieldModule, InputIconModule, InputTextModule, DatePickerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly currentUserService = inject(CurrentUserService);
  readonly dashboardDataService = inject(DashboardDataService);

  // rising trend for cards 1-3
  barChartData: ChartData<'line'> = {
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [{
          data: [3200, 4100, 3800, 5200, 4800, 6100, 5800, 7200],
          borderColor: '#4ade80',
          pointBackgroundColor: '#4ade80',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.4,
          fill: false,
      }],
  };

  // declining trend for card 4
  barChartDataNegative: ChartData<'line'> = {
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [{
          data: [7200, 6500, 6800, 5900, 5400, 4800, 4200, 3800],
          borderColor: '#f87171',
          pointBackgroundColor: '#f87171',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.4,
          fill: false,
      }],
  };

    barChartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false, // 👈 critical — lets height be controlled by parent div
      plugins: {
          legend: { display: false }, // 👈 hide legend, too cramped for it
          title: { display: false },  // 👈 hide title too
          tooltip: {
              backgroundColor: '#0f4f2f',
              titleColor: '#a3d9b1',
              bodyColor: '#ffffff',
          },
      },
      scales: {
          x: {
              ticks: { display: false }, // 👈 hide labels, no space for them
              grid: { display: false },
          },
          y: {
              ticks: { display: false },
              grid: { display: false },
          },
      },
  };
}
