import { Component } from '@angular/core';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {
  showPasswordRules: boolean = false;
  circleColor: string = 'initialColor'; // Cambia 'initialColor' al color por defecto

  validatePassword() {
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const specialChars = '!@#$%^&*()_+{}[]:;<>,.?~\\-=/';
    const hasSpecialChar = Array.from(password).some(char => specialChars.includes(char));
    
    const minLength = password.length >= 8;

    // Validar y actualizar el color del círculo según las reglas de contraseña
    if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar && minLength) {
      this.circleColor = 'green'; // Cumple todas las reglas
    } else {
      this.circleColor = 'red'; // No cumple alguna(s) de las reglas
    }
  }
}