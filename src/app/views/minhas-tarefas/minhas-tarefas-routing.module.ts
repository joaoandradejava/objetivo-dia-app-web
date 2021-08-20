import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasTarefasComponent } from './minhas-tarefas.component';

const routes: Routes = [{ path: '', component: MinhasTarefasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhasTarefasRoutingModule { }
