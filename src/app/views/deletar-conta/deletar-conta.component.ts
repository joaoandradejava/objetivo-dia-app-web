import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deletar-conta',
  templateUrl: './deletar-conta.component.html',
  styleUrls: ['./deletar-conta.component.scss']
})
export class DeletarContaComponent implements OnInit {
  modalRef?: BsModalRef;

  constructor(private usuarioService: UsuarioService, private autenticacaoService: AutenticacaoService, private router: Router, private mensagemService: MensagemService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  public deletarConta(): void {
    this.usuarioService.deletarConta(this.autenticacaoService.getUsuarioAutenticado().id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Sua conta foi deletada com sucesso!')
      this.autenticacaoService.sair()
      this.router.navigate(['/login'])
    })


  }

}
