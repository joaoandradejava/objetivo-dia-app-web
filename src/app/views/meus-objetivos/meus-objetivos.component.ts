import { ObjetivoModelPage } from './../../models/objetivo-model-page';
import { ObjetivoService } from './../../services/objetivo.service';
import { Objetivo } from './../../models/objetivo';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-meus-objetivos',
  templateUrl: './meus-objetivos.component.html',
  styleUrls: ['./meus-objetivos.component.scss']
})
export class MeusObjetivosComponent implements OnInit {

  objetivoModelPage?: ObjetivoModelPage
  formulario: FormGroup
  paginaAtual: number = 0


  constructor(private objetivoService: ObjetivoService, private autenticacaoService: AutenticacaoService, private formBuilder: FormBuilder, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  counter(){
    return new Array(this.objetivoModelPage?.totalPages)
  }

  ngOnInit(): void {
    this.buscarTodos()
  }

  buscarTodos(){
    this.paginaAtual = 0
    this.objetivoService.buscarTodos(this.autenticacaoService.getUsuarioAutenticado().id, 0).subscribe(data => {
      this.objetivoModelPage = data;
      console.log(data)

    })
  }

  anterior(): void {
    if(this.paginaAtual <= 0){
      this.paginaAtual = 0
      return

    }

    this.buscarTodosPorPagina(--this.paginaAtual)
  }

  proximo(): void {
    if(this.paginaAtual >= this.objetivoModelPage!.totalPages - 1){
      return;
    }

    this.buscarTodosPorPagina(++this.paginaAtual)
  }

  buscarTodosPorPagina(pagina: number){
    this.paginaAtual = pagina

    this.objetivoService.buscarTodos(this.autenticacaoService.getUsuarioAutenticado().id, this.paginaAtual).subscribe(data => {
      this.objetivoModelPage = data;
      console.log(data)

    })
  }

  public salvar(): void {
    if(this.formulario.invalid){
      return
    }

    this.objetivoService.salvar(this.autenticacaoService.getUsuarioAutenticado().id , this.formulario.value).subscribe(data => {
      this.buscarTodos()
      this.formulario.reset()
      this.mensagemService.mostrarMensagemDeSucesso('Novo Objetivo adicionado com sucesso!')
    })

  }


}
