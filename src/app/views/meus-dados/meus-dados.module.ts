import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusDadosRoutingModule } from './meus-dados-routing.module';
import { MeusDadosComponent } from './meus-dados.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MeusDadosComponent
  ],
  imports: [
    CommonModule,
    MeusDadosRoutingModule,
    ReactiveFormsModule
  ]
})
export class MeusDadosModule { }
