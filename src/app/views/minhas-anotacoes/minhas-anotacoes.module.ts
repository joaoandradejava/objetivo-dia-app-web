import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasAnotacoesRoutingModule } from './minhas-anotacoes-routing.module';
import { MinhasAnotacoesComponent } from './minhas-anotacoes.component';


@NgModule({
  declarations: [
    MinhasAnotacoesComponent
  ],
  imports: [
    CommonModule,
    MinhasAnotacoesRoutingModule
  ]
})
export class MinhasAnotacoesModule { }
