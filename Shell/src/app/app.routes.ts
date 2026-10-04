import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard, publicOnlyGuard } from './auth.guard';

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
                loadComponent: () => import('@management').then(m => m.AnalyticsComponent)
            },
            {
                path: 'Products',
                loadComponent: () => import('@management').then(m => m.ProductsComponent)
            },
            {
                path: 'Categories',
                loadComponent: () => import('@management').then(m => m.CategoriesComponent)
            },
            {
                path: 'Low-stock',
                loadComponent: () => import('@management').then(m => m.LowStockComponent)
            },
            {
                path: 'Expiring-soon',
                loadComponent: () => import('@management').then(m => m.ExpiringSoonComponent)
            },
            {
                path: 'Suppliers',
                loadComponent: () => import('@management').then(m => m.SuppliersComponent)
            },
            {
                path: 'Orders',
                loadComponent: () => import('@management').then(m => m.OrdersComponent)
            },
            {
                path: 'Sales',
                loadComponent: () => import('@management').then(m => m.SalesComponent)
            },
            {
                path: 'Promotions',
                loadComponent: () => import('@management').then(m => m.PromotionsComponent)
            },
            {
                path: 'Staff',
                loadComponent: () => import('@management').then(m => m.StaffComponent)
            },
            {
                path: 'Settings',
                loadComponent: () => import('@management').then(m => m.SettingsComponent),
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
