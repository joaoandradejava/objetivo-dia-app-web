import { ObjetivoService } from './../../services/objetivo.service';
import { ObjetivoModel } from './../../models/objetivo-model';
import { TarefaModel } from './../../models/tarefa-model';
import { TarefaService } from './../../services/tarefa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-minhas-tarefas',
  templateUrl: './minhas-tarefas.component.html',
  styleUrls: ['./minhas-tarefas.component.scss']
})
export class MinhasTarefasComponent implements OnInit {

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

  ngOnInit(): void {
    this.objetivoService.buscarPorId(this.autenticacaoService.getUsuarioAutenticado().id, this.objetivoId).subscribe(data => {
      this.objetivoModel = data
    })
    this.buscarTodasTarefas()
  }

  buscarTodasTarefas(): void {
    this.tarefaService.buscarTarefas(this.objetivoId).subscribe(data => {
      this.tarefas = data
      this.tarefas = this.tarefas.sort(x => -x.id)
    })
  }

  public adicionarTarefa(): void {
    if (this.formGroup.invalid) {
      return
    }

    this.tarefaService.adicionarTarefa(this.objetivoId, this.formGroup.value).subscribe(data => {
      this.formGroup.reset()
      this.mensagemService.mostrarMensagemDeSucesso('Tarefa adicionada com sucesso!')
      this.buscarTodasTarefas()
    })
  }

}
