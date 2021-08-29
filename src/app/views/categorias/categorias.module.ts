import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { CategoriaInputComponent } from './categoria-input/categoria-input.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    CategoriasComponent,
    CategoriaInputComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),

  ]
})
export class CategoriasModule { }
