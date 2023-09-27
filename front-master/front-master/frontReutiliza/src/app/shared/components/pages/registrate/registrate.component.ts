import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CallServicesService } from './../../../../services/call-services.service';


@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})


export class RegistrateComponent implements OnInit {
  registerForm: FormGroup;
  validateForm: boolean;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private callServicesService: CallServicesService ) {
  }

  ngOnInit() {
    this.validateForm = false;
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      rut: new FormControl(''),
      sexo: new FormControl(''),
      mail: new FormControl(''),
      phone: new FormControl(''),
      phoneWsp: new FormControl(''),
      campus: new FormControl(''),
      imageUser: new FormControl(null)
    });
  }

  validateFormFunction() {
    if (this.registerForm.valid) {
      this.validateForm = true;
      return;
    }
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({
      imageUser: file
    });
    this.registerForm.get('imageUser').updateValueAndValidity()
  }

  copiarTelefono(event: any) {
    this.registerForm.get('phoneWsp').setValue(event.target.value);
  }

  validarTelefono(event: any) {
    if (event.target.value.length != 8){
      this.registerForm.get('phone').setValue(null);
    }
  }

  validarWsp(event: any) {
    if (event.target.value.length != 8){
      this.registerForm.get('phoneWsp').setValue(null);
    }
  }
  

  submitFormUser(){
    if (!this.validateForm) {
      return
    }
    var formData: any = new FormData();
    formData.append("name", this.registerForm.get('name').value);
    formData.append("lastname", this.registerForm.get('lastname').value);
    formData.append("rut", this.registerForm.get('rut').value);
    formData.append("gender", this.registerForm.get('sexo').value);
    formData.append("email", this.registerForm.get('mail').value)+"@utem.cl";
    formData.append("phonne", this.registerForm.get('phone').value);
    formData.append("wsp", this.registerForm.get('phoneWsp').value);
    formData.append("campus", this.registerForm.get('campus').value);
    formData.append("img", this.registerForm.get('imageUser').value);

    this.callServicesService.addUser(formData).subscribe(
      (response) => {
        this.registerForm.reset()
        alert(response.message)
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }
}


