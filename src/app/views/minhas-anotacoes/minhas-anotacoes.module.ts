import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { AnotacaoCardComponent } from './../../components/anotacao-card/anotacao-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasAnotacoesRoutingModule } from './minhas-anotacoes-routing.module';
import { MinhasAnotacoesComponent } from './minhas-anotacoes.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    MinhasAnotacoesComponent,
    AnotacaoCardComponent
  ],
  imports: [
    CommonModule,
    MinhasAnotacoesRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class MinhasAnotacoesModule { }
