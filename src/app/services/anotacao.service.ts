import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  constructor(private http: HttpClient) { }

  public buscarTodasAnotacoesDoUsuario(usuarioId: number, pagina: number, titulo: string): Observable<any> {
    return this.http.get(Backend.anotacoes(usuarioId) + `?page=${pagina}&titulo=${titulo}`)
  }
}
