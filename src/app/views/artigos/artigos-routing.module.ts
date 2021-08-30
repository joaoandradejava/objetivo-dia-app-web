import { ArtigoComponent } from './artigo/artigo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtigosComponent } from './artigos.component';

const routes: Routes = [{ path: '', component: ArtigosComponent }, { path: 'artigo/:id', component: ArtigoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtigosRoutingModule { }
