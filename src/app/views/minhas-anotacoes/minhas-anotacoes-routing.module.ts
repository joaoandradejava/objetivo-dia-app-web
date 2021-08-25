import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasAnotacoesComponent } from './minhas-anotacoes.component';

const routes: Routes = [{ path: '', component: MinhasAnotacoesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhasAnotacoesRoutingModule { }
