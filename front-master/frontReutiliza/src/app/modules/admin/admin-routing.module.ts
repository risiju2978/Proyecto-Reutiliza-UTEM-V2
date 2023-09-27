import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AdmUsersComponent } from './components/adm-users/adm-users.component';
// tslint:disable-next-line:max-line-length

const routes: Routes = [
  { path: '', component: AdminComponent,
  children: [
    {
      path: 'categorias',
      component: CategoriasComponent
    },
    {
      path: 'admin-users',
      component: AdmUsersComponent
    }

  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
