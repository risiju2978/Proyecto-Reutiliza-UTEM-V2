import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaInicioComponent } from './Pagina-de-inicio/vista-inicio/vista-inicio.component';
import { FooterComponent } from './Pagina-de-inicio/footer/footer.component';
const routes: Routes = [
  {path: 'vistaInicio' , component:VistaInicioComponent},
  {path: 'Footer' , component:FooterComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
