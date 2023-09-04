import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    NbButtonModule,
    NbDialogModule,
    NbCardModule,
    NbInputModule,
    FormsModule
  ],
})
export class HomeModule { }
