import { AutenticacaoService } from './../../services/autenticacao.service';
import { UsuarioService } from './../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-login',
  templateUrl: './realizar-login.component.html',
  styleUrls: ['./realizar-login.component.scss']
})
export class RealizarLoginComponent implements OnInit {

  @Output() mudarEvent: EventEmitter<void> = new EventEmitter<void>();
  formularioDeLogin: FormGroup

  constructor(private formBuilder: FormBuilder, private toastService: ToastrService, private usuarioService: UsuarioService, private router: Router, private autenticacaoService: AutenticacaoService) {
    this.formularioDeLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      senha: ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {

  }

  public realizarLogin(): void {
    if(this.formularioDeLogin.invalid){
      return;
    }

    this.usuarioService.logar(this.formularioDeLogin.value).subscribe(data => {
      this.router.navigate(['/meus-objetivos'])
      this.autenticacaoService.autenticar(data)
    })

  }


  public realizarCadastro(): void {
    this.mudarEvent.emit();
  }

}
