import { ObjetivoService } from './../../services/objetivo.service';
import { ObjetivoModel } from './../../models/objetivo-model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-card-objetivo-item',
  templateUrl: './card-objetivo-item.component.html',
  styleUrls: ['./card-objetivo-item.component.scss']
})
export class CardObjetivoItemComponent implements OnInit {

  @Input() objetivoModel?: ObjetivoModel
  @Output() buscarTodosEmitter: EventEmitter<void> = new EventEmitter<void>()
  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private objetivoService: ObjetivoService, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {
    this.objetivoService.buscarPorId(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoModel!.id).subscribe(data => {
      this.formulario.get('titulo')?.setValue(data.titulo)
    })
  }

  public deletarPorId(): void {
    if (confirm(`Deseja realmente deletar o objetivo '${this.objetivoModel?.titulo}'?`)) {
      this.objetivoService.deletarPorId(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoModel!.id).subscribe(data => {
        this.buscarTodosEmitter.emit()
        this.mensagemService.mostrarMensagemDeSucesso('Objetivo deletado com sucesso!')

      })
    }
  }

  public editar(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.objetivoService.atualizar(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoModel!.id, this.formulario.value).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Objetivo atualizado com sucesso!')
      this.buscarTodosEmitter.emit()
    })
  }

}
