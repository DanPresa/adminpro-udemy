import { NgModule } from '@angular/core';

// Components
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        BreadcrumbComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbComponent,
        NopagefoundComponent
    ]
})
export class SharedModule {}
