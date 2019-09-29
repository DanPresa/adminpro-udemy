import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioService, AlertaService } from './service.index';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        UsuarioService,
        AlertaService
    ]
})
export class ServiceModule {}
