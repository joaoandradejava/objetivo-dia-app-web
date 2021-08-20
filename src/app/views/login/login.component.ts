import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRealizarCadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public trocar(): void {
    this.isRealizarCadastro = !this.isRealizarCadastro;
  }

}
