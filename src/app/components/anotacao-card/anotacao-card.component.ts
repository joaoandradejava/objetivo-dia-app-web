import { AnotacaoModel } from './../../models/anotacao-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anotacao-card',
  templateUrl: './anotacao-card.component.html',
  styleUrls: ['./anotacao-card.component.scss']
})
export class AnotacaoCardComponent implements OnInit {

  @Input() anotacaoModel?: AnotacaoModel

  constructor() { }

  ngOnInit(): void {
  }

}
