import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard, UsuarioService, AlertaService } from './service.index';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        LoginGuard,
        UsuarioService,
        AlertaService
    ]
})
export class ServiceModule {}
