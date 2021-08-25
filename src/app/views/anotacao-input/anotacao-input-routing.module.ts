import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnotacaoInputComponent } from './anotacao-input.component';

const routes: Routes = [{ path: '', component: AnotacaoInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnotacaoInputRoutingModule { }
