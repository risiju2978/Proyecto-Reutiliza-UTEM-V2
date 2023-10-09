import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
// En el controlador de tu componente de inicio de sesión
export class IniciarSesionComponent {
  isUserLoggerID = false;
  isAdminLoggedIn = false; // Variable de control
  constructor(private router: Router) {} // Inyecta el Router en el constructor

  login() {

    // Lógica de inicio de sesión (puede ser simplemente establecer isAdminLoggedIn en true)
    this.isAdminLoggedIn = true;
   this.isUserLoggerID= true;
    // Redirige a la vista de administrador
  this.router.navigate(['./administrador']);
  this.router.navigate(['./usarios']);
  }

}

