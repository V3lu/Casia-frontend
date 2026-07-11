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

@Component({
  selector: 'app-dashboard',
  imports: [AvatarModule, ButtonModule, ToolbarModule, MenuModule, PanelModule, DividerModule, SplitterModule, CardModule, FloatLabelModule, IconFieldModule, InputIconModule, InputTextModule, DatePickerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly currentUserService = inject(CurrentUserService);
  readonly dashboardDataService = inject(DashboardDataService);

  
}
