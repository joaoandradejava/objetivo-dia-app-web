import { TarefaService } from './../../services/tarefa.service';
import { TarefaModel } from './../../models/tarefa-model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.scss']
})
export class CardTarefaComponent implements OnInit {

  @Input() tarefaModel?: TarefaModel
  @Output() atualizarListaDeTarefas: EventEmitter<void> = new EventEmitter<void>()
  objetivoId: number = -1

  constructor(private tarefaService: TarefaService, private route: ActivatedRoute, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.objetivoId = data.id
    })
  }

  public fazerTarefa(): void {
    this.tarefaService.fazerTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso(`A tarefa '${this.tarefaModel?.titulo}' foi marcada como feita!`)
      this.atualizarListaDeTarefas.emit()

    })
  }

  public desfazerTarefa(): void {
    this.tarefaService.desfazerTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso(`A tarefa '${this.tarefaModel?.titulo}' foi marcada como desfeita!`)
      this.atualizarListaDeTarefas.emit()

    })
  }

  public deletar(): void {
    this.tarefaService.deletarTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Tarefa deletada com sucesso!')
      this.atualizarListaDeTarefas.emit()
    })
  }

}
