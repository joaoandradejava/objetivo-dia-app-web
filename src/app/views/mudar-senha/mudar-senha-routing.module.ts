import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MudarSenhaComponent } from './mudar-senha.component';

const routes: Routes = [{ path: '', component: MudarSenhaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MudarSenhaRoutingModule { }
