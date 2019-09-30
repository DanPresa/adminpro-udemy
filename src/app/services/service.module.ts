import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard, UsuarioService, SubirArchivoService, AlertaService } from './service.index';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        LoginGuard,
        UsuarioService,
        SubirArchivoService,
        AlertaService
    ]
})
export class ServiceModule {}
