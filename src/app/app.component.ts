import { AutenticacaoService } from './services/autenticacao.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'objetivo-do-dia-angular';

  constructor(private autenticacaoService: AutenticacaoService){}

  public isLogado(): boolean{
    return this.autenticacaoService.isLogado()
  }
}
