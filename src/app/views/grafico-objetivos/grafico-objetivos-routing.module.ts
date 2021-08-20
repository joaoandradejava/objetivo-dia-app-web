import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoObjetivosComponent } from './grafico-objetivos.component';

const routes: Routes = [{ path: '', component: GraficoObjetivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoObjetivosRoutingModule { }
