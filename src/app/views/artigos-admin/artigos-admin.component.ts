import { MensagemService } from 'src/app/services/mensagem.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ArtigoModelPage } from './../../models/artigo-model-page';
import { ArtigoService } from './../../services/artigo.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-artigos-admin',
  templateUrl: './artigos-admin.component.html',
  styleUrls: ['./artigos-admin.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('600ms 0s ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ])),

      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class ArtigosAdminComponent implements OnInit {
  estado: string = ''

  modalRef?: BsModalRef;

  artigoModelPage?: ArtigoModelPage
  paginaAtual: number = 0
  tamanho: number = 1
  idSelecionado: number = -1;

  constructor(private artigoService: ArtigoService, private modalService: BsModalService, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  buscarTodos(): void {
    this.artigoService.buscarTodos(this.paginaAtual, this.tamanho).subscribe(data => {
      this.artigoModelPage = data
    })
  }

  isPossuiArtigo(): boolean {
    return this.artigoModelPage?.content != null && this.artigoModelPage?.content!.length > 0
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page - 1

    this.buscarTodos()
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.idSelecionado = id
    this.modalRef = this.modalService.show(template);
  }

  deletarPorId(): void {
    this.artigoService.deletarPorId(this.idSelecionado).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Artigo deletado com sucesso!')
      this.paginaAtual = 0;
      this.buscarTodos()
      this.modalRef?.hide()
    })
  }

}
