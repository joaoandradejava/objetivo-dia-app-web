import { MensagemService } from './../../services/mensagem.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadorFormulario } from 'src/app/utils/validador-formulario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  formulario: FormGroup
  @Output() fecharModalEvent: EventEmitter<void> = new EventEmitter<void>()

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      "email": ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      "senha": ['', [Validators.required, Validators.maxLength(255)]],
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


  public realizarCadastro(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.usuarioService.salvar(this.formulario.value).subscribe(data => {
      this.formulario.reset()
      this.mensagemService.mostrarMensagemDeSucesso('O seu cadastro foi realizado com sucesso!')
      this.fecharModalEvent.emit()
    })

  }



}
