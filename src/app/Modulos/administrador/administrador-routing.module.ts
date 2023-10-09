import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes correspondientes para las rutas hijas
import { CategoriasComponent } from './Permisos-del-administrador/categorias/categorias.component';
import {  AdministrarcionDeUsuariosComponent } from './Permisos-del-administrador/administracion-de-usuarios/administrarcion-de-usuarios.component';
import { AdministrarcionDePublicacionesComponent } from './Permisos-del-administrador/administracion-de-publicaciones/administrarcion-de-publicaciones.component';
import { PublicarAvisoComponent  } from './Permisos-del-administrador/publicar-aviso/publicar-aviso.component';
import { AdministradorComponent } from './administrador.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';

// Define las rutas hijas para el módulo "Administrador"
const routes: Routes = [
  // Otras rutas aquí...
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    children: [
     
      {
        path: 'categorias',
        component: CategoriasComponent,
      },
      {
        path: 'administracion-de-usuarios',
        component: AdministrarcionDeUsuariosComponent,
      },
      {
        path: 'administracion-de-publicaciones',
        component: AdministrarcionDePublicacionesComponent,
      },
      {
        path: 'publicar-avisos',
        component: PublicarAvisoComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}