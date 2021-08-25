import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnotacaoInputRoutingModule } from './anotacao-input-routing.module';
import { AnotacaoInputComponent } from './anotacao-input.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AnotacaoInputComponent
  ],
  imports: [
    CommonModule,
    AnotacaoInputRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,

  ]
})
export class AnotacaoInputModule { }
