import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './../app.component';
import { HomeComponent } from './../shared/components/home/home.component';
import { QuienesSomosComponent } from './../shared/components/pages/quienes-somos/quienes-somos.component';
import { RegistrateComponent } from './../shared/components/pages/registrate/registrate.component'
import { CategoriasComponent } from './../modules/admin/components/categorias/categorias.component'
import { PublicaAvisoComponent } from './../shared/components/pages/publica-aviso/publica-aviso.component'
import { ComoFuncionaComponent} from './../shared/components/pages/como-funciona/como-funciona.component';
import { PreguntasFrecuentesComponent } from './../shared/components/pages/preguntas-frecuentes/preguntas-frecuentes.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: 'registrate', component: RegistrateComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'publica-aviso', component: PublicaAvisoComponent},
  {path: 'como-funciona', component: ComoFuncionaComponent},
  {path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent},
  {
    path: 'admin',
    loadChildren: () => import('./../modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./../modules/users/users.module').then((m) => m.UsersModule)
  }
]; 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class RouteModule { }
