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
  styleUrls: ['./minhas-anotacoes.component.scss']
})
export class MinhasAnotacoesComponent implements OnInit {

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
      console.log(data)
    })
  }

  getTitulo(): string{
    return this.formGroup.get('titulo')?.value
  }

  public deletarPorId(anotacaoId: number): void {
    if (confirm('Tem certeza que deseja deletar essa anotação?')) {
      this.anotacaoService.deletarPorId(this.autenticacaoService.getUsuarioAutenticado().id, anotacaoId).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Anotação deletada com sucesso!')
        this.buscarTodos()
        this.paginaAtual = 0
      })
    }
  }

  public isTemAnotacao(): boolean{
    return this.anotacaoModelPage?.content != undefined && this.anotacaoModelPage!.totalElements > 0
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page - 1

    this.buscarTodos()
  }

}
