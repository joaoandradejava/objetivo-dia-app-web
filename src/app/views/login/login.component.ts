import { trigger, transition, query, style, animate, keyframes, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('500ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-500px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0px)', offset: 1 }),

        ]))
      ]))
    ]),
  ]
})
export class LoginComponent implements OnInit {

  public estado: string = ''

  isRealizarCadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public trocar(): void {
    this.isRealizarCadastro = !this.isRealizarCadastro;
  }

}
