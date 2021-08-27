import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { FeedbackService } from './../../services/feedback.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('700ms 0s ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 1 }),

        ]))
      ])),
      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class FeedbackComponent implements OnInit {
  public estado: string = ''

  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService, private mensagemService: MensagemService, private autenticacaoService: AutenticacaoService) {
    this.formulario = formBuilder.group({
      "feedback": ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit(): void {
  }

  public enviarFeedback(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.feedbackService.enviarFeedback(this.autenticacaoService.getUsuarioAutenticado().id, this.formulario.value).subscribe(data => {
      this.formulario.reset()
      this.mensagemService.mostrarMensagemDeSucesso('Seu feedback foi enviado com sucesso! Agradecemos seu feedback.')
    })

  }

}
