import { ArtigoService } from './../../../services/artigo.service';
import { MensagemService } from './../../../services/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidadorFormulario } from './../../../utils/validador-formulario';
import { CategoriaModel } from './../../../models/categoria-model';
import { CategoriaService } from './../../../services/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as Editor from 'src/app/ckeditor5/build/ckeditor.js';
import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-artigo-input',
  templateUrl: './artigo-input.component.html',
  styleUrls: ['./artigo-input.component.scss'],
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
export class ArtigoInputComponent implements OnInit {
  estado: string  = ''

  public Editor = Editor;
  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'outdent',
        'alignment',
        'indent',
        '|',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        'horizontalLine',
        'underline'
      ]
    },
    language: 'pt-br',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    licenseKey: '',
  }

  formulario: FormGroup
  categorias: CategoriaModel[] = []
  artigoId: number = -1
  textoBotao: string = ''

  constructor(private formBuilder: FormBuilder, private categoriaService: CategoriaService, private route: ActivatedRoute, private mensagemService: MensagemService, private artigoService: ArtigoService, private router: Router) {
    this.formulario = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "autor": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "descricao": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "avatarUrl": ['', [Validators.required]],
      "categoria": formBuilder.group({
        "id": ['', [Validators.required]]
      }),
      "conteudo": ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.categoriaService.buscarTodos().subscribe(data => {
      this.categorias = data
    })

    this.route.params.subscribe(data => {
      this.artigoId = data.id
    })

    this.textoBotao = this.isEditar() ? 'Editar' : 'Salvar'

    if (this.isEditar()) {
      this.artigoService.buscarPorId(this.artigoId).subscribe(data => {
        this.formulario.get('titulo')?.setValue(data.titulo)
        this.formulario.get('autor')?.setValue(data.autor)
        this.formulario.get('descricao')?.setValue(data.descricao)
        this.formulario.get('avatarUrl')?.setValue(data.avatarUrl)
        this.formulario.get('conteudo')?.setValue(data.conteudo)
        this.formulario.get('categoria.id')?.setValue(data.categoria.id)


      })
    }
  }


  public isEditar(): boolean {
    return this.artigoId > 0 ? true : false
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

  public getCssFormulario(label: string): object {
    return ValidadorFormulario.getCssFormulario(this.formulario, label)
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      return
    }

    if (!this.isEditar()) {
      this.artigoService.salvar(this.formulario.value).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Artigo publicado com sucesso!');
        this.router.navigate(['/artigos-admin/artigo-input/' + data.id])
      })
    } else {
      this.artigoService.atualizar(this.formulario.value, this.artigoId).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Artigo atualizado com sucesso!');
      })
    }
  }
}
