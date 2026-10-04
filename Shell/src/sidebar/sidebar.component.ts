import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { CurrentUserService } from 'Shared/Services';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

type NavigationItem = {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
};

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, CardModule, DividerModule, DrawerModule, RippleModule, RouterLink, FloatLabelModule, InputTextModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly router = inject(Router);
  private readonly currentUserService = inject(CurrentUserService);

  readonly user = this.currentUserService.user;
  readonly userFirstName = computed(() => this.user()?.firstName ?? '');
  readonly userLastName = computed(() => this.user()?.lastName ?? '');
  readonly userRole = computed(() => this.user()?.role ?? '');
  readonly visible = signal(false);

  readonly navItems: NavigationItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', route: '/Dashboard', roles: ['Admin', 'Manager', 'Warehouse', 'Sales'] },
    { label: 'Analytics', icon: 'pi pi-chart-line', route: '/Analytics', roles: ['Admin', 'Manager', 'Sales'] },
    { label: 'Products', icon: 'pi pi-box', route: '/Products', roles: ['Admin', 'Manager', 'Warehouse'] },
    { label: 'Categories', icon: 'pi pi-tags', route: '/Categories', roles: ['Admin', 'Manager'] },
    { label: 'Low Stock', icon: 'pi pi-exclamation-triangle', route: '/Low-stock', roles: ['Admin', 'Manager', 'Warehouse'] },
    { label: 'Expiring Soon', icon: 'pi pi-clock', route: '/Expiring-soon', roles: ['Admin', 'Manager', 'Warehouse'] },
    { label: 'Orders', icon: 'pi pi-shopping-cart', route: '/Orders', roles: ['Admin', 'Manager', 'Sales'] },
    { label: 'Sales', icon: 'pi pi-dollar', route: '/Sales', roles: ['Admin', 'Sales', 'Manager'] },
    { label: 'Promotions', icon: 'pi pi-megaphone', route: '/Promotions', roles: ['Admin', 'Sales', 'Manager'] },
    { label: 'Suppliers', icon: 'pi pi-truck', route: '/Suppliers', roles: ['Admin', 'Manager'] },
    { label: 'Staff', icon: 'pi pi-users', route: '/Staff', roles: ['Admin', 'Manager'] },
    { label: 'Settings', icon: 'pi pi-cog', route: '/Settings', roles: ['Admin'] },
  ];

  readonly visibleNavItems = computed(() => {
    const userRole = this.user()?.role ?? '';
    return this.navItems.filter((item) =>
      !item.roles || item.roles.some((role) => role.toLowerCase() === userRole.toLowerCase()),
    );
  });

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.currentUserService.logout();
    this.router.navigateByUrl('/login');
  }
}
