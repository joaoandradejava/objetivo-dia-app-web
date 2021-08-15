import { AutenticadoGuard } from './guards/autenticado.guard';
import { NaoAutenticadoGuard } from './guards/nao-autenticado.guard';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusObjetivosComponent } from './views/meus-objetivos/meus-objetivos.component';

const routes: Routes = [
  { path: '', redirectTo: 'meus-objetivos', pathMatch: 'full' },
  { path: 'meus-objetivos', component: MeusObjetivosComponent, canActivate: [AutenticadoGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NaoAutenticadoGuard] },
  { path: 'meus-dados', loadChildren: () => import('./views/meus-dados/meus-dados.module').then(m => m.MeusDadosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
