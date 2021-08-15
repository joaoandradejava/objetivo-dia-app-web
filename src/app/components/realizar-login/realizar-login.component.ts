import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-realizar-login',
  templateUrl: './realizar-login.component.html',
  styleUrls: ['./realizar-login.component.scss']
})
export class RealizarLoginComponent implements OnInit {

  @Output() mudarEvent: EventEmitter<void> = new EventEmitter<void>();
  formularioDeLogin: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.formularioDeLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      senha: ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  ngOnInit(): void {


  }

  public realizarCadastro(): void {
    this.mudarEvent.emit();
  }

}
