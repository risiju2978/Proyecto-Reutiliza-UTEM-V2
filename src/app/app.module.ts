import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './Pagina-de-inicio/footer/footer.component';
import { HeaderComponent } from './Pagina-de-inicio/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComoFuncionaComponent } from './Vistas_general/como-funciona/como-funciona.component';
import { PreguntasFrecuentesComponent } from './Vistas_general/preguntas-frecuentes/preguntas-frecuentes.component';
import { ReglasDeReutilizaComponent } from './Vistas_general/reglas-de-reutiliza/reglas-de-reutiliza.component';
import { ReduceReutilizaReciclaComponent } from './Vistas_general/reduce-reutiliza-recicla/reduce-reutiliza-recicla.component';
import { RegistrarseComponent } from './Vistas_general/registrarse/registrarse.component';
import { IniciarSesionComponent } from './Vistas_general/iniciar-sesion/iniciar-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ComoFuncionaComponent,
    PreguntasFrecuentesComponent,
    ReglasDeReutilizaComponent,
    ReduceReutilizaReciclaComponent,
    RegistrarseComponent,
    IniciarSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
