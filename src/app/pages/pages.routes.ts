import { Routes } from '@angular/router';

import { LoginGuard } from '../services/service.index';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'perfil', component: ProfileComponent },
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];
