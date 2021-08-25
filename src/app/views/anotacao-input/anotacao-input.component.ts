import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { AnotacaoService } from './../../services/anotacao.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as Editor from 'src/app/ckeditor5/build/ckeditor.js';

@Component({
  selector: 'app-anotacao-input',
  templateUrl: './anotacao-input.component.html',
  styleUrls: ['./anotacao-input.component.scss'],
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
export class AnotacaoInputComponent implements OnInit {
  public estado: string = ''

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
        'fontBackgroundColor',
        'fontColor',
        'fontFamily',
        'imageUpload',
        'imageInsert'
      ]
    },
    language: 'pt-br',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    licenseKey: '',


  }

  formulario: FormGroup
  textoButtonSalvar: string = ''
  id: number = -1;


  constructor(private formBuilder: FormBuilder, private mensagemService: MensagemService, private anotacaoService: AnotacaoService, private autenticacaoService: AutenticacaoService, private route: ActivatedRoute, private router: Router) {
    this.formulario = formBuilder.group({
      "titulo": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "conteudo": ['']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data.id
    })

    if (this.isEditar()) {
      this.anotacaoService.buscarPorId(this.autenticacaoService.getUsuarioAutenticado().id, this.id).subscribe(data => {
        this.formulario.get('titulo')?.setValue(data.titulo)
        this.formulario.get('conteudo')?.setValue(data.conteudo)

      })
    }

    this.textoButtonSalvar = this.isEditar() ? 'Editar' : 'Salvar'
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      return;
    }

    if (!this.isEditar()) {
      this.anotacaoService.salvar(this.autenticacaoService.getUsuarioAutenticado().id, this.formulario.value).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Anotação Salva com sucesso')
        this.router.navigate(['/anotacao-input/' + data.id])
      })
    } else {
      this.anotacaoService.atualizar(this.autenticacaoService.getUsuarioAutenticado().id, this.id, this.formulario.value).subscribe(data => {
        this.mensagemService.mostrarMensagemDeSucesso('Anotação atualizada com sucesso')
      })
    }
  }


  private isEditar(): boolean {
    return this.id > 0 ? true : false
  }

}