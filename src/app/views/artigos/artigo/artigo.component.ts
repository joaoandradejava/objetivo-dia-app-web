import { ArtigoFullModel } from './../../../models/artigo-full-model';
import { ActivatedRoute } from '@angular/router';
import { ArtigoService } from './../../../services/artigo.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('600ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-300px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0px)', offset: 1 }),
        ]))
      ])),
      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(300px)', offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class ArtigoComponent implements OnInit {
  estado: string = ''

  artigoFullModel?: ArtigoFullModel
  artigoId: number = -1

  constructor(private artigoService: ArtigoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.artigoId = data.id

      this.artigoService.buscarPorId(this.artigoId).subscribe(data => {
        this.artigoFullModel = data
      })
    })
  }

}
