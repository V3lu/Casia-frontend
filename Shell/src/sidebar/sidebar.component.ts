import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, CardModule, DividerModule, DrawerModule, RippleModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly router = inject(Router);

  visible = signal<boolean>(false);

  navItems = [
    { label: 'Dashboard', icon: 'pi pi-th-large', route: '/Dashboard' },
    { label: 'Analytics', icon: 'pi pi-chart-line', route: '/Analytics' },
    { label: 'Products', icon: 'pi pi-box', route: '/Products' },
    { label: 'Categories', icon: 'pi pi-tags', route: '/Categories' },
    { label: 'Low Stock', icon: 'pi pi-exclamation-triangle', route: '/Low-stock' },
    { label: 'Expiring Soon', icon: 'pi pi-clock', route: '/Expiring-soon' },
    { label: 'Orders', icon: 'pi pi-shopping-cart', route: '/Orders' },
    { label: 'Sales', icon: 'pi pi-dollar', route: '/Sales' },
    { label: 'Promotions', icon: 'pi pi-megaphone', route: '/Promotions' },
    { label: 'Suppliers', icon: 'pi pi-truck', route: '/Suppliers' },
    { label: 'Staff', icon: 'pi pi-users', route: '/Staff' },
    { label: 'Settings', icon: 'pi pi-cog', route: '/Settings' },
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
