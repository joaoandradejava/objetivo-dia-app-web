import { UsuarioUpdateInput } from './../models/usuario-update-input';
import { Login } from './../models/login';
import { Backend } from './../utils/backend';
import { UsuarioCreateInput } from './../models/usuario-create-input';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public logar(login: Login): Observable<any> {
    return this.http.post(Backend.login, login)
  }

  public salvar(usuarioCreateInput: UsuarioCreateInput): Observable<any> {
    return this.http.post(Backend.usuarios, usuarioCreateInput)
  }

  public atualizar(id: number, usuarioUpdateInput: UsuarioUpdateInput): Observable<any> {
    return this.http.put(Backend.usuarios + `/${id}`, usuarioUpdateInput)
  }

  public buscarResumoPorId(id: number): Observable<any> {
    return this.http.get(Backend.usuarios + `/${id}/resumo`)
  }
}
