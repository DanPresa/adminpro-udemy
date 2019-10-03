import { Routes } from '@angular/router';

import { LoginGuard } from '../services/service.index';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

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
            { path: 'hospitales', component: HospitalesComponent },
            { path: 'medicos', component: MedicosComponent },
            { path: 'medico/:id', component: MedicoComponent },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];
