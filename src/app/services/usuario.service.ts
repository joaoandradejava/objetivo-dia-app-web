import { EsqueceuSenhaInput } from './../models/esqueceu-senha-input';
import { MudancaSenhaInput } from './../models/mudanca-senha-input';
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

  public deletarConta(id: number): Observable<any> {
    return this.http.delete(Backend.usuarios + `/${id}`)
  }

  public salvar(usuarioCreateInput: UsuarioCreateInput): Observable<any> {
    return this.http.post(Backend.usuarios, usuarioCreateInput)
  }

  public atualizar(id: number, usuarioUpdateInput: UsuarioUpdateInput): Observable<any> {
    return this.http.put(Backend.usuarios + `/${id}`, usuarioUpdateInput)
  }

  public mudarSenha(id: number, mudancaSenhaInput: MudancaSenhaInput): Observable<any> {
    return this.http.put(Backend.usuarios + `/${id}/senha`, mudancaSenhaInput)
  }

  public buscarResumoPorId(id: number): Observable<any> {
    return this.http.get(Backend.usuarios + `/${id}/resumo`)
  }

  public esqueceuSenha(esqueceuSenhaInput: EsqueceuSenhaInput): Observable<any> {
    return this.http.put(Backend.usuarios + '/esqueci-senha', esqueceuSenhaInput)
  }
}
