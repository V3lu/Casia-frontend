import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CurrentUserService } from 'Shared/Services';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, RouterOutlet, ToastModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss'
})
export class AppComponent {
  private readonly currentUserService = inject(CurrentUserService);
  readonly isAuthenticated = computed(() => this.currentUserService.isAuthenticated());
}
