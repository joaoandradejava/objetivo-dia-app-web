import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { transition, trigger, query, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-deletar-conta',
  templateUrl: './deletar-conta.component.html',
  styleUrls: ['./deletar-conta.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('0.7s 0s ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 0.4, offset: 0.5 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ])),

      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0.4, offset: 0.5 }),
          style({ opacity: 0, offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class DeletarContaComponent implements OnInit {
  public estado: string = ''

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
      this.modalRef?.hide()
    })


  }

}
