import { CardArtigoComponent } from './../../components/card-artigo/card-artigo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtigosRoutingModule } from './artigos-routing.module';
import { ArtigosComponent } from './artigos.component';
import { ArtigoComponent } from './artigo/artigo.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    ArtigosComponent,
    CardArtigoComponent,
    ArtigoComponent
  ],
  imports: [
    CommonModule,
    ArtigosRoutingModule,
    PaginationModule.forRoot()
  ]
})
export class ArtigosModule { }
