import { UsuarioService } from './../../services/usuario.service';
import { ValidadorFormulario } from './../../utils/validador-formulario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.scss']
})
export class MudarSenhaComponent implements OnInit {

  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private usuarioService: UsuarioService, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "senhaAtual": ['', [Validators.required, Validators.maxLength(255)]],
      "novaSenha": ['', [Validators.required, Validators.maxLength(255)]],
      "confirmacaoSenha": ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {
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

  public mudarSenha(): void {
    if (this.formulario.invalid) {
      return
    }

    this.usuarioService.mudarSenha(this.autenticacaoService.getUsuarioAutenticado().id, this.formulario.value).subscribe(data => {
      this.formulario.reset()
      this.mensagemService.mostrarMensagemDeSucesso('Senha atualizada com sucesso!')
    })
  }

}
