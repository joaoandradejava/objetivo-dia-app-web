import { UsuarioLogado } from './../models/usuario-logado';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public autenticar(usuarioLogado: UsuarioLogado): void {
    localStorage.setItem('usuario-logado', JSON.stringify(usuarioLogado))
  }

  public isLogado(): boolean{
    return localStorage.getItem('usuario-logado') != null? true : false
  }

  public sair(): void {
    localStorage.clear()
  }

}
