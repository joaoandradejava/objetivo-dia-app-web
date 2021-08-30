import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ArtigoModelPage } from './../../models/artigo-model-page';
import { ArtigoService } from './../../services/artigo.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.scss'],
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
export class ArtigosComponent implements OnInit {
  estado: string = ''

  artigoModelPage?: ArtigoModelPage
  tamanho: number = 6
  paginaAtual: number = 0

  constructor(private artigoService: ArtigoService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  buscarTodos(): void {
    this.artigoService.buscarTodos(this.paginaAtual, this.tamanho).subscribe(data => {
      this.artigoModelPage = data
    })
  }

  isPossuiArtigo(): boolean {
    return this.artigoModelPage?.content != null && this.artigoModelPage?.content!.length > 0
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page - 1
    this.buscarTodos()
  }
}
