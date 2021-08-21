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
  styleUrls: ['./grafico-objetivos.component.scss']
})
export class GraficoObjetivosComponent implements OnInit {
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
