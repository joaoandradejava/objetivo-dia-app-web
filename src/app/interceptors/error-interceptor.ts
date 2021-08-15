import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MensagemService } from '../services/mensagem.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MensagemService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(catchError((error) => {
      this.mensagemService.mostrarMensagemDeError( error.error.userMessage);

      return throwError(error)
    }));
  }
}
