import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard, publicOnlyGuard } from './auth.guard';
import { roleGuard } from './role.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [publicOnlyGuard],
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
            {
                path: 'Dashboard',
                loadComponent: () => import('@management').then(m => m.DashboardComponent)
            },
            {
                path: 'Analytics',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager', 'Sales'] },
                loadComponent: () => import('@management').then(m => m.AnalyticsComponent)
            },
            {
                path: 'Products',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager', 'Warehouse'] },
                loadComponent: () => import('@management').then(m => m.ProductsComponent)
            },
            {
                path: 'Categories',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager'] },
                loadComponent: () => import('@management').then(m => m.CategoriesComponent)
            },
            {
                path: 'Low-stock',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager', 'Warehouse'] },
                loadComponent: () => import('@management').then(m => m.LowStockComponent)
            },
            {
                path: 'Expiring-soon',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager', 'Warehouse'] },
                loadComponent: () => import('@management').then(m => m.ExpiringSoonComponent)
            },
            {
                path: 'Suppliers',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager'] },
                loadComponent: () => import('@management').then(m => m.SuppliersComponent)
            },
            {
                path: 'Orders',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager', 'Sales'] },
                loadComponent: () => import('@management').then(m => m.OrdersComponent)
            },
            {
                path: 'Sales',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Sales', 'Manager'] },
                loadComponent: () => import('@management').then(m => m.SalesComponent)
            },
            {
                path: 'Promotions',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Sales', 'Manager'] },
                loadComponent: () => import('@management').then(m => m.PromotionsComponent)
            },
            {
                path: 'Staff',
                canActivate: [roleGuard],
                data: { roles: ['Admin', 'Manager'] },
                loadComponent: () => import('@management').then(m => m.StaffComponent)
            },
            {
                path: 'Settings',
                canActivate: [roleGuard],
                data: { roles: ['Admin'] },
                loadComponent: () => import('@management').then(m => m.SettingsComponent),
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
