import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasTarefasRoutingModule } from './minhas-tarefas-routing.module';
import { MinhasTarefasComponent } from './minhas-tarefas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardTarefaComponent } from 'src/app/components/card-tarefa/card-tarefa.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


@NgModule({
  declarations: [
    MinhasTarefasComponent,
    CardTarefaComponent
  ],
  imports: [
    CommonModule,
    MinhasTarefasRoutingModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ProgressbarModule.forRoot()

  ]
})
export class MinhasTarefasModule { }
