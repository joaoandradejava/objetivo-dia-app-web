import { AnotacaoCardComponent } from './../../components/anotacao-card/anotacao-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasAnotacoesRoutingModule } from './minhas-anotacoes-routing.module';
import { MinhasAnotacoesComponent } from './minhas-anotacoes.component';


@NgModule({
  declarations: [
    MinhasAnotacoesComponent,
    AnotacaoCardComponent
  ],
  imports: [
    CommonModule,
    MinhasAnotacoesRoutingModule
  ]
})
export class MinhasAnotacoesModule { }
