import { CategoriaModel } from './../../models/categoria-model';
import { ObjetivoService } from './../../services/objetivo.service';
import { ObjetivoModel } from './../../models/objetivo-model';
import { Component, Input, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CorProgresso } from 'src/app/utils/cor-progresso';

@Component({
  selector: 'app-card-objetivo-item',
  templateUrl: './card-objetivo-item.component.html',
  styleUrls: ['./card-objetivo-item.component.scss']
})
export class CardObjetivoItemComponent implements OnInit {

  @Input() objetivoModel?: ObjetivoModel
  @Input() categorias: CategoriaModel[] = []
  @Output() buscarTodosEmitter: EventEmitter<void> = new EventEmitter<void>()
  formularioEditar: FormGroup
  modalRef?: BsModalRef;

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private objetivoService: ObjetivoService, private mensagemService: MensagemService, private modalService: BsModalService) {
    this.formularioEditar = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.maxLength(255)]],
      "categoria": formBuilder.group({
        "id": ['', Validators.required]
      })
    })
  }

  ngOnInit(): void {

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.buscar()
  }

  public buscar(): void {
    this.formularioEditar.get('titulo')?.setValue(this.objetivoModel?.titulo)
    this.formularioEditar.get('categoria')?.get('id')?.setValue(this.objetivoModel?.categoria.id)
   }

  corProgresso(): string {
    return CorProgresso.corProgresso(this.objetivoModel!.porcentagem)
  }

  public deletarPorId(): void {
    this.objetivoService.deletarPorId(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoModel!.id).subscribe(data => {
      this.buscarTodosEmitter.emit()
      this.mensagemService.mostrarMensagemDeSucesso('Objetivo deletado com sucesso!')
      this.modalRef?.hide()
    })
  }

  public editar(): void {
    if (this.formularioEditar.invalid) {
      return;
    }

    this.objetivoService.atualizar(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoModel!.id, this.formularioEditar.value).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Objetivo atualizado com sucesso!')
      this.formularioEditar.reset()
      this.buscarTodosEmitter.emit()
      this.modalRef?.hide()
    })
  }

}
