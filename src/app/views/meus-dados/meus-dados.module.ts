import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusDadosRoutingModule } from './meus-dados-routing.module';
import { MeusDadosComponent } from './meus-dados.component';


@NgModule({
  declarations: [
    MeusDadosComponent
  ],
  imports: [
    CommonModule,
    MeusDadosRoutingModule
  ]
})
export class MeusDadosModule { }
