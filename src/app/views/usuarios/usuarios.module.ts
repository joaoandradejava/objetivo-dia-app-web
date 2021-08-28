import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
