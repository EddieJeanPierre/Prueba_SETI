import { NgModule } from '@angular/core';
import { NebularModule } from './nebular/nebular.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuSidebarComponent
  ],
  imports: [
    NebularModule
  ],
  exports: [
    NebularModule, HeaderComponent, MenuSidebarComponent
  ]
})
export class CoreModule { }
