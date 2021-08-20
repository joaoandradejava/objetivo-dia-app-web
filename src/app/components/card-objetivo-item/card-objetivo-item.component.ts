import { ObjetivoService } from './../../services/objetivo.service';
import { ObjetivoModel } from './../../models/objetivo-model';
import { Component, Input, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-card-objetivo-item',
  templateUrl: './card-objetivo-item.component.html',
  styleUrls: ['./card-objetivo-item.component.scss']
})
export class CardObjetivoItemComponent implements OnInit {

  @Input() objetivoModel?: ObjetivoModel
  @Output() buscarTodosEmitter: EventEmitter<void> = new EventEmitter<void>()
  formularioEditar: FormGroup
  modalRef?: BsModalRef;

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private objetivoService: ObjetivoService, private mensagemService: MensagemService, private modalService: BsModalService) {
    this.formularioEditar = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.maxLength(255)]]
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
