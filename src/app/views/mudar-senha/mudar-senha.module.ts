import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MudarSenhaRoutingModule } from './mudar-senha-routing.module';
import { MudarSenhaComponent } from './mudar-senha.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MudarSenhaComponent
  ],
  imports: [
    CommonModule,
    MudarSenhaRoutingModule,
    ReactiveFormsModule
  ]
})
export class MudarSenhaModule { }
