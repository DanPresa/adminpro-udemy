import { Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../services/service.index';

export const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];
