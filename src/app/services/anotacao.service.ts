import { AnotacaoInput } from './../models/anotacao-input';
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

  public salvar(usuarioId: number, anotacaoInput: AnotacaoInput): Observable<any> {
    return this.http.post(Backend.anotacoes(usuarioId), anotacaoInput)
  }

  public buscarPorId(usuarioId: number, anotacaoId: number): Observable<any> {
    return this.http.get(Backend.anotacoes(usuarioId) + `/${anotacaoId}`)
  }

  public atualizar(usuarioId: number, anotacaoId: number, anotacaoInput: AnotacaoInput): Observable<any> {
    return this.http.put(Backend.anotacoes(usuarioId) + `/${anotacaoId}`, anotacaoInput)
  }
}
