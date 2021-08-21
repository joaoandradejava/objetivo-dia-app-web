import { ObjetivoInput } from './../models/objetivo-input';
import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {

  constructor(private http: HttpClient) { }

  public buscarTodos(id: number, pagina: number, tamanho: number): Observable<any> {
    return this.http.get(Backend.objetivos(id) + `?page=${pagina}&size=${tamanho}`)
  }

  public buscarPorId(id: number, objetivoId: number): Observable<any> {
    return this.http.get(Backend.objetivos(id) + `/${objetivoId}`)
  }

  public salvar(id: number, objetivoInput: ObjetivoInput): Observable<any> {
    return this.http.post(Backend.objetivos(id), objetivoInput)
  }

  public deletarPorId(id: number, objetivoId: number): Observable<any> {
    return this.http.delete(Backend.objetivos(id) + `/${objetivoId}`)
  }

  public atualizar(id: number, objetivoId: number, objetivoInput: ObjetivoInput): Observable<any> {
    return this.http.put(Backend.objetivos(id) + `/${objetivoId}`, objetivoInput)
  }

  public graficoDosObjetivosConcluidos(usuarioId: number): Observable<any> {
    return this.http.get(Backend.objetivos(usuarioId) + '/grafico-conclusao')
  }
}
