import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from './../../shared/shared.module'

import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {ReactiveFormsModule} from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';

@NgModule({
  declarations: [ UsersComponent, EvaluacionesComponent, MiCuentaComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
