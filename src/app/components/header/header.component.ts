import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public sair(): void{
    this.autenticacaoService.sair()
  }
}
