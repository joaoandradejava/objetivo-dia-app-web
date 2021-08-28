import { CategoriaInputComponent } from './categoria-input/categoria-input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';

const routes: Routes = [{ path: '', component: CategoriasComponent }, { path: 'categoria-input', component: CategoriaInputComponent }, { path: 'categoria-input/:id', component: CategoriaInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
