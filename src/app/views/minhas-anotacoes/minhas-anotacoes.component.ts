import { AutenticacaoService } from './../../services/autenticacao.service';
import { AnotacaoModelPage } from './../../models/anotacao-model-page';
import { AnotacaoService } from './../../services/anotacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minhas-anotacoes',
  templateUrl: './minhas-anotacoes.component.html',
  styleUrls: ['./minhas-anotacoes.component.scss']
})
export class MinhasAnotacoesComponent implements OnInit {

  anotacaoModelPage?: AnotacaoModelPage
  paginaAtual: number = 0
  titulo: string = ''

  constructor(private anotacaoService: AnotacaoService, private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.anotacaoService.buscarTodasAnotacoesDoUsuario(this.autenticacaoService.getUsuarioAutenticado().id, this.paginaAtual, this.titulo).subscribe(data => {
      this.anotacaoModelPage = data
    })
  }

}
