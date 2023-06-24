import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './Pagina-de-inicio/footer/footer.component';
import { HeaderComponent } from './Pagina-de-inicio/header/header.component';
const routes: Routes = [
  {path: 'header' , component:HeaderComponent},
  {path: 'Footer' , component:FooterComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
