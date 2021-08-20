import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoObjetivosRoutingModule } from './grafico-objetivos-routing.module';
import { GraficoObjetivosComponent } from './grafico-objetivos.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    GraficoObjetivosComponent
  ],
  imports: [
    CommonModule,
    GraficoObjetivosRoutingModule,
    NgApexchartsModule,
  ]
})
export class GraficoObjetivosModule { }
