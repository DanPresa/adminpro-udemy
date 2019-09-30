import { NgModule } from '@angular/core';

// Modules
import { PipesModule } from '../pipes/pipes.module';

// Components
import { HeaderComponent, SidebarComponent, BreadcrumbComponent, NopagefoundComponent } from './shared.index';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
        NopagefoundComponent
    ],
    imports: [
        PipesModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
        NopagefoundComponent
    ]
})
export class SharedModule {}
