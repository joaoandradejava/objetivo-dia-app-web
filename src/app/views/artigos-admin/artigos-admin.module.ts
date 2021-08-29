import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtigosAdminRoutingModule } from './artigos-admin-routing.module';
import { ArtigosAdminComponent } from './artigos-admin.component';
import { ArtigoInputComponent } from './artigo-input/artigo-input.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ArtigosAdminComponent,
    ArtigoInputComponent
  ],
  imports: [
    CommonModule,
    ArtigosAdminRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),

  ]
})
export class ArtigosAdminModule { }
