import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule
  ],
  exports: [
    NbThemeModule,
    NbSidebarModule,
    NbMenuModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule
  ]
})
export class NebularModule { }
