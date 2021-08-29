import { ArtigoInput } from './../models/artigo-input';
import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtigoService {

  constructor(private http: HttpClient) { }

  public buscarTodos(pagina: number, tamanho: number): Observable<any> {
    return this.http.get(Backend.artigos() + `?page=${pagina}&size=${tamanho}`)
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(Backend.artigos() + `/${id}`)
  }

  public salvar(artigoInput: ArtigoInput): Observable<any> {
    return this.http.post(Backend.artigos(), artigoInput)
  }

  public atualizar(artigoInput: ArtigoInput, id: number): Observable<any> {
    return this.http.put(Backend.artigos() + `/${id}`, artigoInput)
  }

  public deletarPorId(id: number): Observable<any> {
    return this.http.delete(Backend.artigos() + `/${id}`)
  }
}
