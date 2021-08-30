import { state, trigger, style, transition, animate, keyframes } from '@angular/animations';
import { TarefaService } from './../../services/tarefa.service';
import { TarefaModel } from './../../models/tarefa-model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.scss'],
  animations: [
    trigger('mudanca-cor', [
      state('nao-feito', style({opacity: 1, backgroundColor: '#ff2b2bfd'})),
      state('feito', style({opacity: 1, backgroundColor: '#408140'})),
      transition('feito <=> nao-feito', [
        animate('100ms 0s ease-in-out', keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0.7, offset: 0.7}),
          style({opacity: 0.6, offset: 1}),

        ]))
      ])
    ])
  ]
})
export class CardTarefaComponent implements OnInit {

  @Input() tarefaModel?: TarefaModel
  @Output() atualizarObjetivoEvent: EventEmitter<void> = new EventEmitter<void>()
  @Output() deletarTarefaEvent: EventEmitter<number> = new EventEmitter<number>()
  objetivoId: number = -1

  public estado: string = 'nao-feito'

  constructor(private tarefaService: TarefaService, private route: ActivatedRoute, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.estado = this.tarefaModel?.isFeita? 'feito': 'nao-feito'
    this.route.params.subscribe(data => {
      this.objetivoId = data.id
    })
  }

  public fazerTarefa(): void {
    this.tarefaModel!.isFeita = true
    this.estado = 'feito'

    this.tarefaService.fazerTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso(`A tarefa '${this.tarefaModel?.titulo}' foi marcada como feita!`)
      this.atualizarObjetivoEvent.emit()
    })
  }

  public desfazerTarefa(): void {
    this.tarefaModel!.isFeita = false
    this.estado = 'nao-feito'

    this.tarefaService.desfazerTarefa(this.objetivoId, this.tarefaModel!.id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso(`A tarefa '${this.tarefaModel?.titulo}' foi marcada como desfeita!`)
      this.atualizarObjetivoEvent.emit()
    })
  }

  public deletar(): void {
    this.deletarTarefaEvent.emit(this.tarefaModel?.id)
  }

}
