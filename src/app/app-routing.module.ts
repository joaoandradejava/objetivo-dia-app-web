import { DeletarContaComponent } from './views/deletar-conta/deletar-conta.component';
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
  { path: 'meus-dados', loadChildren: () => import('./views/meus-dados/meus-dados.module').then(m => m.MeusDadosModule), canActivate: [AutenticadoGuard] },
  { path: 'mudar-senha', loadChildren: () => import('./views/mudar-senha/mudar-senha.module').then(m => m.MudarSenhaModule) },
  { path: 'deletar-conta', component: DeletarContaComponent, canActivate: [AutenticadoGuard] },
  { path: 'meus-objetivos/:id/minhas-tarefas', loadChildren: () => import('./views/minhas-tarefas/minhas-tarefas.module').then(m => m.MinhasTarefasModule), canActivate: [AutenticadoGuard] },
  { path: 'grafico-objetivos-concluidos', loadChildren: () => import('./views/grafico-objetivos/grafico-objetivos.module').then(m => m.GraficoObjetivosModule), canActivate: [AutenticadoGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
