import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './Pagina-de-inicio/header/header.component';
import { ComoFuncionaComponent } from './Vistas_general/como-funciona/como-funciona.component';
import { IniciarSesionComponent } from './Vistas_general/iniciar-sesion/iniciar-sesion.component';
import { FooterComponent } from './Pagina-de-inicio/footer/footer.component';
import { PreguntasFrecuentesComponent } from './Vistas_general/preguntas-frecuentes/preguntas-frecuentes.component';
import { ReduceReutilizaReciclaComponent } from './Vistas_general/reduce-reutiliza-recicla/reduce-reutiliza-recicla.component';
import { RegistrarseComponent } from './Vistas_general/registrarse/registrarse.component';
import { ReglasDeReutilizaComponent } from './Vistas_general/reglas-de-reutiliza/reglas-de-reutiliza.component';


// rutas establecidas desde pagina de inicio
const routes: Routes = [
  {path:'', redirectTo: 'Pagina-de-inicio', pathMatch:'full'},
  {path: 'header' , component:HeaderComponent},
  {path: 'Footer' , component:FooterComponent},
  {path: 'como-funciona' , component:ComoFuncionaComponent},
  {path: 'iniciar-sesion' , component:IniciarSesionComponent},
  {path: 'preguntas-frecuentes' , component:PreguntasFrecuentesComponent},
  {path: 'reduce-reutiliza-recicla' , component:ReduceReutilizaReciclaComponent},
  {path: 'registrarse' , component:RegistrarseComponent},
  {path: 'reglas-de-reutiliza' , component:ReglasDeReutilizaComponent},
  {path:'**', redirectTo: 'Pagina-de-inicio', pathMatch:'full'}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
