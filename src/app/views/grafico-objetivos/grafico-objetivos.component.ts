import { transition, trigger, query, animate, keyframes, style } from '@angular/animations';
import { GraficoObjetivoConcluidoDTO } from './../../models/grafico-objetivo-concluido-dto';
import { ObjetivoService } from './../../services/objetivo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-grafico-objetivos',
  templateUrl: './grafico-objetivos.component.html',
  styleUrls: ['./grafico-objetivos.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('0.7s 0s ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 0.4, offset: 0.5 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ])),

      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0.4, offset: 0.5 }),
          style({ opacity: 0, offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class GraficoObjetivosComponent implements OnInit {

  public estado: string = ''

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  graficoObjetivoConcluidoDto?: GraficoObjetivoConcluidoDTO

  constructor(private objetivoService: ObjetivoService, private autenticacaoService: AutenticacaoService) {


  }

  ngOnInit(): void {
    this.objetivoService.graficoDosObjetivosConcluidos(this.autenticacaoService.getUsuarioAutenticado().id).subscribe(data => {
      this.graficoObjetivoConcluidoDto = data
      this.chartOptions = {
        series: [
          {
            name: "Quantidade",
            data: [this.graficoObjetivoConcluidoDto?.objetivosNaoConcluidos, this.graficoObjetivoConcluidoDto?.objetivosConcluidos]
          }
        ],
        chart: {
          height: 350,
          type: "bar",

        },
        colors: [
          "#FF0000",
          "#A7FF27",
        ],
        plotOptions: {
          bar: {
            columnWidth: "20%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        },
        xaxis: {
          categories: [
            ["Não Concluido"],
            ["Concluido"],
          ],
          labels: {
            style: {
              colors: [
                "#FF0000",
                "#A7FF27",
              ],
              fontSize: "12px"
            }
          }
        }
      };
    })
  }

}
