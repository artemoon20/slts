import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { authGuard, guestGuard } from '../services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        canActivate: [guestGuard],
        children: [
            {
                path: 'sign-in',
                component: SignInComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            }
        ]
    },
    {
        path: 'sign-in',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-up',
        redirectTo: '/auth/sign-up',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'users',
                component: UsersManagementComponent
            },
            {
                path: 'analytics',
                component: AnalyticsComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
