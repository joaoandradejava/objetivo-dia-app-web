import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';
import { MensagemService } from 'src/app/services/mensagem.service';
import { CategoriaService } from './../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-input',
  templateUrl: './categoria-input.component.html',
  styleUrls: ['./categoria-input.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('600ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-300px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])),
      transition(':leave', query('*', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(300px)', offset: 1 }),
        ]))
      ]))
    ])
  ]
})
export class CategoriaInputComponent implements OnInit {
  estado: string = ''

  formulario: FormGroup
  categoriaId: number = -1;
  textoBotaoSalvar: string = ''

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private categoriaService: CategoriaService, private mensagemService: MensagemService, private router: Router) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "codigoCor": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "avatarUrl": ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.categoriaId = data.id
    })

    this.textoBotaoSalvar = this.isEditar() ? 'Editar' : 'Salvar';

    if (this.isEditar()) {
      this.categoriaService.buscarPorId(this.categoriaId).subscribe(data => {
        this.formulario.get('nome')?.setValue(data.nome)
        this.formulario.get('codigoCor')?.setValue(data.codigoCor)
        this.formulario.get('avatarUrl')?.setValue(data.avatarUrl)
      })
    }
  }

  isEditar(): boolean {
    return this.categoriaId > 0 ? true : false
  }

  cancelar(): void {
    this.formulario.reset()
  }

  salvar(): void {
    if (this.formulario.invalid) {
      return
    }

    if (!this.isEditar()) {
      this.categoriaService.salvar(this.formulario.value).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Categoria salva com sucesso!')

        this.router.navigate(['/categorias/categoria-input/' + data.id])
      })
    } else {
      this.categoriaService.atualizar(this.categoriaId, this.formulario.value).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Categoria atualizada com sucesso!')
      })
    }

  }

}
