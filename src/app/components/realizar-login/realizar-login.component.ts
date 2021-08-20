import { AutenticacaoService } from './../../services/autenticacao.service';
import { UsuarioService } from './../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-realizar-login',
  templateUrl: './realizar-login.component.html',
  styleUrls: ['./realizar-login.component.scss']
})
export class RealizarLoginComponent implements OnInit {

  @Output() mudarEvent: EventEmitter<void> = new EventEmitter<void>();
  formularioDeLogin: FormGroup
  formularioDoEmail: FormGroup
  modalRef!: BsModalRef;

  constructor(private formBuilder: FormBuilder, private toastService: ToastrService, private usuarioService: UsuarioService, private router: Router, private autenticacaoService: AutenticacaoService, private modalService: BsModalService, private mensagemService: MensagemService) {
    this.formularioDeLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      senha: ['', [Validators.required, Validators.maxLength(255)]]
    })

    this.formularioDoEmail = formBuilder.group({
      'email': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255), Validators.email]]
    })
  }

  ngOnInit(): void {

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public realizarLogin(): void {
    if (this.formularioDeLogin.invalid) {
      return;
    }

    this.usuarioService.logar(this.formularioDeLogin.value).subscribe(data => {
      this.router.navigate(['/meus-objetivos'])
      this.autenticacaoService.autenticar(data)
    })

  }

  public enviarNovaSenha(): void {
    if (this.formularioDoEmail.invalid) {
      return
    }

    this.usuarioService
      .esqueceuSenha(this.formularioDoEmail.value).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Um nova senha foi enviada para o seu email.')
        this.formularioDoEmail.reset()
        this.modalRef.hide()
      })
  }


  public realizarCadastro(): void {
    this.mudarEvent.emit();
  }

}
