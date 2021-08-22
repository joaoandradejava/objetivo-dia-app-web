import { UsuarioUpdateInput } from './../../models/usuario-update-input';
import { UsuarioService } from './../../services/usuario.service';
import { ValidadorFormulario } from './../../utils/validador-formulario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('500ms 0s ease-in', keyframes([
          style({opacity: 0, transform: 'translate(-500px, 0px)', offset: 0}),
          style({opacity: 1, transform: 'translate(0px, 0px)', offset: 1}),

        ]))
      ])),

      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({opacity: 1, transform: 'translate(0px, 0px)', offset: 0}),
          style({opacity: 0, transform: 'translate(-500px, 0px)', offset: 1}),

        ]))
      ]))
    ])
  ]
})
export class MeusDadosComponent implements OnInit {
  public estado: string = ''

  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private autenticacaoService: AutenticacaoService, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      "email": ['']
    })
  }

  ngOnInit(): void {
    if (this.autenticacaoService.isLogado()) {
      this.usuarioService.buscarResumoPorId(this.autenticacaoService.getUsuarioAutenticado().id).subscribe(data => {
        this.formulario.get('nome')?.setValue(data.nome)
        this.formulario.get('email')?.setValue(data.email)
      })
    }
  }


  public confirmar(): void {
    if (this.formulario.invalid) {
      return;
    }


    if (this.autenticacaoService.isLogado()) {
      let usuarioUpdate: UsuarioUpdateInput = new UsuarioUpdateInput(this.formulario.get('nome')?.value)
      this.usuarioService.atualizar(this.autenticacaoService.getUsuarioAutenticado().id, usuarioUpdate).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Seus dados foram atualizados com sucesso!')
      })
    }
  }

  public getCssFormulario(label: string): object {
    return ValidadorFormulario.getCssFormulario(this.formulario, label);
  }

  public mensagemDeCampoObrigatorio(label: string): string {
    return ValidadorFormulario.mensagemDeCampoObrigatorio(label)
  }

  public mensagemCampoInvalido(label: string): string {
    return ValidadorFormulario.mensagemCampoInvalido(label)
  }

  public mensagemDeTamanhoMinimoEMaximo(label: string, min: number, max: number): string {
    return ValidadorFormulario.mensagemDeTamanhoMinimoEMaximo(label, min, max)
  }


}
