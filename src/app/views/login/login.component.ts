import { trigger, transition, query, style, animate, keyframes, state } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('animacao-frase', [
      transition(':enter', [
        animate('1.3s 0s ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(-300px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ]),

    trigger('card-login', [
      transition(':enter', [
        animate('1.4s 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translate(200px, -200px)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translate(0px, -200px)', offset: 0.5 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ])
  ]

})
export class LoginComponent implements OnInit {

  public estado: string = ''

  constructor() { }

  ngOnInit(): void {
  }


}
