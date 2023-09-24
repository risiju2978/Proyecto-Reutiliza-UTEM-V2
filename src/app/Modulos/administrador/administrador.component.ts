import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  selectedOption: string = 'posts'; // Opción predeterminada (Publicaciones)

  // Aquí puedes agregar la lógica necesaria para manejar las diferentes opciones del menú.
}
