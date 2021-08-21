import { SpinnerInterceptor } from './interceptors/spinner-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { MeusObjetivosComponent } from './views/meus-objetivos/meus-objetivos.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { RealizarLoginComponent } from './components/realizar-login/realizar-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenJwtInterceptor } from './interceptors/token-jwt-interceptor';
import { CardObjetivoItemComponent } from './components/card-objetivo-item/card-objetivo-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeletarContaComponent } from './views/deletar-conta/deletar-conta.component'; // <-- import the module
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MeusObjetivosComponent,
    CadastroUsuarioComponent,
    RealizarLoginComponent,
    CardObjetivoItemComponent,
    DeletarContaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),
    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundColor": "#ffffff",
      "backgroundGradientStopColor": "#c0c0c0",
      "backgroundOpacity": 0,
      "backgroundPadding": -10,
      "radius": 70,
      "maxPercent": 100,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#0791f2",
      "innerStrokeWidth": 0,
      "subtitleColor": "#444444",
      "showInnerStroke": false,
      "startFromZero": false
    }),
    ProgressbarModule.forRoot(),
    NgxSpinnerModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenJwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
