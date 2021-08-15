import { UsuarioLogado } from './../models/usuario-logado';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class TokenJwtInterceptor implements HttpInterceptor {

  constructor(private autenticacaoService: AutenticacaoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.autenticacaoService.isLogado()) {
      let usuarioLogado: UsuarioLogado = this.autenticacaoService.getUsuarioAutenticado()

      let reqClone = req.clone({ setHeaders: { 'Authorization': usuarioLogado.tokenJwt } })

      return next.handle(reqClone)
    }

    return next.handle(req);
  }
}
