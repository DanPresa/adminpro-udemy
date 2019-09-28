import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: NopagefoundComponent }
];
