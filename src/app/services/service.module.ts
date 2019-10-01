import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard, SidebarService, UsuarioService, SubirArchivoService, AlertaService } from './service.index';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        LoginGuard,
        SidebarService,
        UsuarioService,
        SubirArchivoService,
        AlertaService
    ]
})
export class ServiceModule {}
