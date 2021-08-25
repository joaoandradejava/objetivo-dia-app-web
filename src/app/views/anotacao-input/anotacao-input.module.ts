import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnotacaoInputRoutingModule } from './anotacao-input-routing.module';
import { AnotacaoInputComponent } from './anotacao-input.component';


@NgModule({
  declarations: [
    AnotacaoInputComponent
  ],
  imports: [
    CommonModule,
    AnotacaoInputRoutingModule
  ]
})
export class AnotacaoInputModule { }
