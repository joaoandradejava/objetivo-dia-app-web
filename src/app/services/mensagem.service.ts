import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private toastService: ToastrService) { }

  public mostrarMensagemDeSucesso(conteudo: string): void {
    this.toastService.clear()
    this.toastService.success(conteudo, 'Sucesso!')
  }

  public mostrarMensagemDeError( conteudo: string): void {
    this.toastService.clear()
    this.toastService.error(conteudo, 'Falhou!')
  }

  public mostrarMensagemDeAlerta(conteudo: string): void {
    this.toastService.clear()
    this.toastService.warning(conteudo, 'Alerta!')
  }
}
