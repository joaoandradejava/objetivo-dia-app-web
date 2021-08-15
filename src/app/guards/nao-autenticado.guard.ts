import { AutenticacaoService } from './../services/autenticacao.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaoAutenticadoGuard implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.autenticacaoService.isLogado()) {
      this.router.navigate(['/meus-objetivos'])

      return false
    }

    return true;
  }

}
