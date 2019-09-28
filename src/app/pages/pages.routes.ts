import { Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];
