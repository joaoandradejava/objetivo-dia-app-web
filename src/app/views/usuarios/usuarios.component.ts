import { MensagemService } from './../../services/mensagem.service';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UsuarioPerfilModelPage } from './../../models/usuario-perfil-model-page';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', [query('*', [
        animate('600ms 0s ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ])]),
      transition(':leave', query('*', [
        animate('300ms 0s ease-in-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class UsuariosComponent implements OnInit {
  estado: string = ''

  formulario: FormGroup

  usuarioPerfilModelPage?: UsuarioPerfilModelPage
  pagina: number = 0
  tamanho: number = 10

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "nome": [''],
      "email": [''],
      "pesquisarPor": ['nome']
    })
  }

  ngOnInit(): void {
    this.buscarTodos()

    this.formulario.get('pesquisarPor')?.valueChanges.subscribe(data => {
      this.formulario.get('nome')?.setValue('')
      this.formulario.get('email')?.setValue('')

    })

    this.formulario.get('nome')?.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.buscarTodos()
    })

    this.formulario.get('email')?.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.buscarTodos()
    })
  }

  buscarTodos(): void {
    this.usuarioService.buscarTodos(this.pagina, this.tamanho, this.pegarValor('email'), this.pegarValor('nome')).subscribe(data => {
      this.usuarioPerfilModelPage = data
    })
  }

  pegarValor(valor: string): string {
    return this.formulario.get(valor)?.value.trim() != '' ? this.formulario.get(valor)?.value : ''
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagina = event.page - 1

    this.buscarTodos()
  }

  public tirarAdmin(id: number): void {
    this.usuarioService.tirarPermissaoDeAdministrado(id).subscribe(data => {
      this.buscarTodos()
      this.mensagemService.mostrarMensagemDeSucesso('Operação realizada com sucesso!')
    })

  }

  public darAdmin(id: number): void {
    this.usuarioService.darPermissaoDeAdministrado(id).subscribe(data => {
      this.buscarTodos()
      this.mensagemService.mostrarMensagemDeSucesso('Operação realizada com sucesso!')
    })
  }
}
