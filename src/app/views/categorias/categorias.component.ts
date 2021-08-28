import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';
import { MensagemService } from 'src/app/services/mensagem.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoriaService } from './../../services/categoria.service';
import { CategoriaModel } from './../../models/categoria-model';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
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
      ])),
    ])
  ]
})
export class CategoriasComponent implements OnInit {
  estado: string = ''

  modalRef?: BsModalRef;
  categorias: CategoriaModel[] = []
  idSelecionado: number = -1;

  constructor(private categoriaService: CategoriaService, private modalService: BsModalService, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  buscarTodos(): void {
    this.categoriaService.buscarTodos().subscribe(data => {
      this.categorias = data
    })
  }

  public deletarPorId(): void {
    this.categoriaService.deletarPorId(this.idSelecionado).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Categoria deletada com sucesso!')
      this.removerDoArray(this.idSelecionado)
      this.modalRef?.hide()
    })
  }

  removerDoArray(id: number): void {
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].id == id) {
        this.categorias.splice(i, 1)

        return
      }
    }
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.idSelecionado = id
    this.modalRef = this.modalService.show(template);
  }

}
