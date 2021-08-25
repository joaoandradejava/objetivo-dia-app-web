import { AnotacaoModel } from './../../models/anotacao-model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-anotacao-card',
  templateUrl: './anotacao-card.component.html',
  styleUrls: ['./anotacao-card.component.scss']
})
export class AnotacaoCardComponent implements OnInit {

  @Input() anotacaoModel?: AnotacaoModel
  @Output() deletarAnotacaoEvent: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  public deletar(): void {
    this.deletarAnotacaoEvent.emit(this.anotacaoModel?.id)
  }
}
