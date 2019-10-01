import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from './component.index';

@NgModule({
    declarations: [
        ModalUploadComponent
    ],
    exports: [
        ModalUploadComponent
    ],
    imports: [
        CommonModule,
        PipesModule
    ]
})
export class ComponentsModule {}
