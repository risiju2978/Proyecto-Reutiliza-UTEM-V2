import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component'; 
import { UsersComponent } from './pages/users/users.component'
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';

const routes: Routes = [
  { path: '', component: UsersComponent,
  children: [
    {
      path: 'evaluacion',
      component: EvaluacionesComponent
    },
    {
      path: 'mi-cuenta',
      component: MiCuentaComponent
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
