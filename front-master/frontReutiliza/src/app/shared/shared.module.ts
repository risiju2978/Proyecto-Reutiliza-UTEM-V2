import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import {MatSnackBarModule} from '@angular/material'
import {MatIconModule} from '@angular/material/icon';
import { PublicaAvisoComponent } from './components/pages/publica-aviso/publica-aviso.component';
import { ComoFuncionaComponent } from './components/pages/como-funciona/como-funciona.component';
import { PreguntasFrecuentesComponent } from './components/pages/preguntas-frecuentes/preguntas-frecuentes.component';

@NgModule({
  declarations: [
    EvaluacionComponent,
    PublicaAvisoComponent,
    ComoFuncionaComponent,
    PreguntasFrecuentesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    EvaluacionComponent,
    MatSnackBarModule
  ]
})
export class SharedModule { }
