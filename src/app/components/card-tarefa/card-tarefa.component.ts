import { TarefaService } from './../../services/tarefa.service';
import { TarefaModel } from './../../models/tarefa-model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.scss'],
})
export class CardTarefaComponent implements OnInit {

  @Input() tarefaModel?: TarefaModel
  @Output() atualizarObjetivoEvent: EventEmitter<void> = new EventEmitter<void>()
  @Output() deletarTarefaEvent: EventEmitter<number> = new EventEmitter<number>()
  objetivoId: number = -1

  constructor(private tarefaService: TarefaService, private route: ActivatedRoute, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.objetivoId = data.id
    })
  }

  public fazerTarefa(): void {
    this.tarefaModel!.isFeita = true

    this.tarefaService.fazerTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso(`A tarefa '${this.tarefaModel?.titulo}' foi marcada como feita!`)
      this.atualizarObjetivoEvent.emit()
    })
  }

  public desfazerTarefa(): void {
    this.tarefaModel!.isFeita = false

    this.tarefaService.desfazerTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso(`A tarefa '${this.tarefaModel?.titulo}' foi marcada como desfeita!`)
      this.atualizarObjetivoEvent.emit()
    })
  }

  public deletar(): void {
    this.deletarTarefaEvent.emit(this.tarefaModel?.id)
  }

}
