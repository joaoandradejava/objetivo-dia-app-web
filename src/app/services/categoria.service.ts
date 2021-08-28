import { CategoriaInput } from './../models/categoria-input';
import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  public buscarTodos(): Observable<any> {
    return this.http.get(Backend.categorias())
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(Backend.categorias() + `/${id}`)
  }

  public salvar(categoriaInput: CategoriaInput): Observable<any> {
    return this.http.post(Backend.categorias(), categoriaInput)
  }

  public atualizar(id: number, categoriaInput: CategoriaInput): Observable<any> {
    return this.http.put(Backend.categorias() + `/${id}`, categoriaInput)
  }

  public deletarPorId(id: number): Observable<any> {
    return this.http.delete(Backend.categorias() + `/${id}`)
  }
}
