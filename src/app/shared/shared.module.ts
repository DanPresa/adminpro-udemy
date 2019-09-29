import { NgModule } from '@angular/core';

// Components
import { HeaderComponent, SidebarComponent, BreadcrumbComponent, NopagefoundComponent } from './shared.index';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
        NopagefoundComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
        NopagefoundComponent
    ]
})
export class SharedModule {}
