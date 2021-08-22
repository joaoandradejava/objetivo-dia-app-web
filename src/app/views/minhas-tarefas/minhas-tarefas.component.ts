import { ObjetivoService } from './../../services/objetivo.service';
import { ObjetivoModel } from './../../models/objetivo-model';
import { TarefaModel } from './../../models/tarefa-model';
import { TarefaService } from './../../services/tarefa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { CorProgresso } from 'src/app/utils/cor-progresso';
import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-minhas-tarefas',
  templateUrl: './minhas-tarefas.component.html',
  styleUrls: ['./minhas-tarefas.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('500ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translate(-500px, 0px)', offset: 0 }),
          style({ opacity: 1, transform: 'translate(0px, 0px)', offset: 1 }),

        ]))
      ])),

      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translate(0px, 0px)', offset: 0 }),
          style({ opacity: 0, transform: 'translate(-500px, 0px)', offset: 1 }),

        ]))
      ]))
    ]),

    trigger('animacao-card', [
      transition(':enter', [
        animate('500ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-500px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0px)', offset: 1 }),
        ]))
      ]),
      transition('* => void', [
        animate('400ms 0s ease-in', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(300px)', offset: 1 }),
        ]))
      ]),
    ])

  ]
})
export class MinhasTarefasComponent implements OnInit {

  public estado: string = ''

  tarefas: TarefaModel[] = []
  objetivoModel?: ObjetivoModel
  formGroup: FormGroup
  objetivoId: number = -1

  constructor(private formBuilder: FormBuilder, private mensagemService: MensagemService, private tarefaService: TarefaService, private route: ActivatedRoute, private objetivoService: ObjetivoService, private autenticacaoService: AutenticacaoService) {
    this.formGroup = this.formBuilder.group({
      "titulo": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })
    route.params.subscribe(data => {
      this.objetivoId = data.id
    })

  }

  public corProgresso(): any {
    return CorProgresso.corProgressoBootstrap(this.objetivoModel!.porcentagem)
  }

  ngOnInit(): void {
    this.buscarTodasTarefas()
  }

  buscarObjetivo(): void {
    this.objetivoService.buscarPorId(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoId).subscribe(data => {
      this.objetivoModel = data
    })
  }

  buscarTodasTarefas(): void {
    this.buscarObjetivo()

    this.tarefaService.buscarTarefas(this.objetivoId).subscribe(data => {
      this.tarefas = data
      this.tarefas = this.tarefas.sort(x => -x.id)
    })
  }

  public deletarPorId(id: number): void {
    this.tarefaService.deletarTarefa(this.objetivoId, id).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Tarefa deletada com sucesso!')
      this.buscarObjetivo()
    })

    for (let i = 0; i < this.tarefas.length; i++) {
      if (this.tarefas[i].id == id) {
        this.tarefas.splice(i, 1)
        return
      }
    }
  }

  public adicionarTarefa(): void {
    if (this.formGroup.invalid) {
      return
    }

    this.tarefaService.adicionarTarefa(this.objetivoId, this.formGroup.value).subscribe(data => {
      this.formGroup.reset()
      this.mensagemService.mostrarMensagemDeSucesso('Tarefa adicionada com sucesso!')
      this.tarefas.push(data)
      this.buscarObjetivo()
    })
  }

}
