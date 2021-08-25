import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnotacaoModel } from './../../models/anotacao-model';
import { Component, Input, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-anotacao-card',
  templateUrl: './anotacao-card.component.html',
  styleUrls: ['./anotacao-card.component.scss']
})
export class AnotacaoCardComponent implements OnInit {
  modalRef?: BsModalRef;
  @Input() anotacaoModel?: AnotacaoModel
  @Output() deletarAnotacaoEvent: EventEmitter<number> = new EventEmitter<number>()

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  public deletar(): void {
    this.deletarAnotacaoEvent.emit(this.anotacaoModel?.id)
    this.modalRef?.hide()
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
