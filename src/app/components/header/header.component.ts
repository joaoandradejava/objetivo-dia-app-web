import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('800ms 0s ease-in', keyframes([
          style({opacity: 0,transform: 'translateX(-300px)', offset:0}),
          style({opacity: 1,transform: 'translateX(0)', offset:1}),

        ]))
      ])),
      transition(':leave', query('*', [
        animate('400ms 0s ease-out', keyframes([
          style({opacity: 1,transform: 'translateX(0)', offset:0}),
          style({opacity: 0,transform: 'translateX(-300px)', offset:1}),

        ]))
      ])),
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public estado: string = ''

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public sair(): void{
    this.autenticacaoService.sair()
  }

  public nomeUsuarioLogado(): string {
    return this.autenticacaoService.getUsuarioAutenticado().nome
  }
}
