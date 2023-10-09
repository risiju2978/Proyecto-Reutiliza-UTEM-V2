import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministradorRoutingModule } from './administrador-routing.module'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, AdministradorRoutingModule],
})
export class AdministradorModule {}
