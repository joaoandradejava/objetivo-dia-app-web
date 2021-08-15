import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusObjetivosComponent } from './views/meus-objetivos/meus-objetivos.component';

const routes: Routes = [
  {path: '', redirectTo: 'meus-objetivos', pathMatch: 'full'},
  {path: 'meus-objetivos', component: MeusObjetivosComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
