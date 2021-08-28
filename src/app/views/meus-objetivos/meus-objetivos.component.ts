import { CategoriaModel } from './../../models/categoria-model';
import { CategoriaService } from './../../services/categoria.service';
import { ObjetivoModelPage } from './../../models/objetivo-model-page';
import { ObjetivoService } from './../../services/objetivo.service';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagemService } from 'src/app/services/mensagem.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-meus-objetivos',
  templateUrl: './meus-objetivos.component.html',
  styleUrls: ['./meus-objetivos.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', [query('*', [
        animate('600ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-300px)', offset: 0 }),
          style({ opacity: .4, transform: 'translateY(-100px)', offset: .6 }),
          style({ opacity: 1, transform: 'translateY(0px)', offset: 1 })
        ]))
      ])]),
      transition(':leave', query('*', [
        animate('300ms 0s ease-in-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class MeusObjetivosComponent implements OnInit {

  public estado: string = ''

  categorias: CategoriaModel[] = []

  objetivoModelPage?: ObjetivoModelPage
  formulario: FormGroup
  paginaAtual: any = 0
  tamanhoDaPagina: number = 5

  constructor(private objetivoService: ObjetivoService, private autenticacaoService: AutenticacaoService, private formBuilder: FormBuilder, private mensagemService: MensagemService, private categoriaService: CategoriaService) {
    this.formulario = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.maxLength(255)]],
      "categoria": formBuilder.group({
        "id": ['', [Validators.required]]
      })
    })
  }



  ngOnInit(): void {
    this.categoriaService.buscarTodos().subscribe(data => {
      this.categorias = data
    })

    this.buscarTodos()
  }

  buscarTodos() {
    this.paginaAtual = 0
    this.objetivoService.buscarTodos(this.autenticacaoService.getUsuarioAutenticado().id, 0, this.tamanhoDaPagina).subscribe(data => {
      this.objetivoModelPage = data;

    })
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page;
    this.buscarTodosPorPagina(--this.paginaAtual)

  }

  buscarTodosPorPagina(pagina: number) {
    this.paginaAtual = pagina

    this.objetivoService.buscarTodos(this.autenticacaoService.getUsuarioAutenticado().id, this.paginaAtual, this.tamanhoDaPagina).subscribe(data => {
      this.objetivoModelPage = data;

    })
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      return
    }

    this.objetivoService.salvar(this.autenticacaoService.getUsuarioAutenticado().id, this.formulario.value).subscribe(data => {
      this.buscarTodos()
      this.formulario.reset()
      this.mensagemService.mostrarMensagemDeSucesso('Novo Objetivo adicionado com sucesso!')
    })

  }


}
