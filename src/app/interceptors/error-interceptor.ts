import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MensagemService } from '../services/mensagem.service';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MensagemService, private autenticacaoService: AutenticacaoService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(catchError((error) => {
      let status = error.error.status;

      if (status == 403) {
        this.mensagemService.mostrarMensagemDeAlerta('Sua sessão expirou.')
        this.autenticacaoService.sair()
        this.router.navigate(['/login'])
      } else {
        this.mensagemService.mostrarMensagemDeError(error.error.userMessage);
      }
      return throwError(error)
    }));
  }
}
