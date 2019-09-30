import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        RouterModule,
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
