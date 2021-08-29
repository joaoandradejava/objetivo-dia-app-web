import { ArtigoInputComponent } from './artigo-input/artigo-input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtigosAdminComponent } from './artigos-admin.component';

const routes: Routes = [{ path: '', component: ArtigosAdminComponent }, { path: 'artigo-input', component: ArtigoInputComponent }, { path: 'artigo-input/:id', component: ArtigoInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtigosAdminRoutingModule { }
