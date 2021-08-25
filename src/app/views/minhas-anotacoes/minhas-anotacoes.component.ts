import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MensagemService } from './../../services/mensagem.service';
import { AutenticacaoService } from './../../services/autenticacao.service';
import { AnotacaoModelPage } from './../../models/anotacao-model-page';
import { AnotacaoService } from './../../services/anotacao.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-minhas-anotacoes',
  templateUrl: './minhas-anotacoes.component.html',
  styleUrls: ['./minhas-anotacoes.component.scss'],
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
export class MinhasAnotacoesComponent implements OnInit {
  public estado: string = ''

  anotacaoModelPage?: AnotacaoModelPage
  paginaAtual: number = 0
  formGroup: FormGroup

  constructor(private anotacaoService: AnotacaoService, private autenticacaoService: AutenticacaoService, private mensagemService: MensagemService, private formBuillder: FormBuilder) {
    this.formGroup = formBuillder.group({
      "titulo": ['']
    })

    this.formGroup.get('titulo')?.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.buscarTodos()
    })
  }

  ngOnInit(): void {
    this.buscarTodos()
  }

  buscarTodos(): void {
    this.anotacaoService.buscarTodasAnotacoesDoUsuario(this.autenticacaoService.getUsuarioAutenticado().id, this.paginaAtual, this.getTitulo()).subscribe(data => {
      this.anotacaoModelPage = data
    })
  }

  getTitulo(): string {
    return this.formGroup.get('titulo')?.value
  }

  public deletarPorId(anotacaoId: number): void {
    this.anotacaoService.deletarPorId(this.autenticacaoService.getUsuarioAutenticado().id, anotacaoId).subscribe(data => {
      this.mensagemService.mostrarMensagemDeSucesso('Anotação deletada com sucesso!')
      this.buscarTodos()
      this.paginaAtual = 0
    })

  }

  public isTemAnotacao(): boolean {
    return this.anotacaoModelPage?.content != undefined && this.anotacaoModelPage!.totalElements > 0
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page - 1

    this.buscarTodos()
  }

}
