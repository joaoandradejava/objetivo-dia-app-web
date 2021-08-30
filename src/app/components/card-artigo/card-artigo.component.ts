import { ArtigoModel } from './../../models/artigo-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-artigo',
  templateUrl: './card-artigo.component.html',
  styleUrls: ['./card-artigo.component.scss']
})
export class CardArtigoComponent implements OnInit {

  @Input() artigoModel?: ArtigoModel

  constructor() { }

  ngOnInit(): void {
  }

}
