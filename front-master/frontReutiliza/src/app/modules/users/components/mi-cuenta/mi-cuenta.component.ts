import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CallServicesService } from './../../../../services/call-services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  miCuentaForm: FormGroup;
  validateForm: boolean;
  name: string;
  lastname: string;
  rut: string;
  sexo: string;
  mail: string;
  phone: string;
  phoneWsp: string;
  campus: string;
  imageUser: string;
  body: any;
  userId: string= "6";
  public imageP;


  constructor(
    private formBuilder: FormBuilder,
    private callServicesService: CallServicesService,
    private sanitizer: DomSanitizer
  ) { 
    
  }

  ngOnInit() {
    this.getUsuario();
    this.validateForm = false;
    // this.miCuentaForm = new FormGroup({
    //   name: new FormControl(''),
    //   lastname: new FormControl(''),
    //   rut: new FormControl(''),
    //   sexo: new FormControl(''),
    //   mail: new FormControl(''),
    //   phone: new FormControl(''),
    //   phoneWsp: new FormControl(''),
    //   campus: new FormControl(''),
    //   imageUser: new FormControl(null)
    // });

  }

  buildForm() {
    this.miCuentaForm = this.formBuilder.group({
      name: [this.name, [Validators.required]],
      lastname: [this.lastname, [Validators.required]],
      rut: [this.rut, [Validators.required, Validators.minLength(15)]],
      sexo: [this.sexo],
      mail: [this.mail, [ Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$')]],
      phone: [this.phone, [ Validators.minLength(8)]],
      phoneWsp: [this.phoneWsp, [ Validators.minLength(8)]],
      campus: [this.campus, [Validators.required]],
      image: [this.imageUser, [Validators.required]]     
    });

  }

  buildBody() {

    this.body = {
      name: this.miCuentaForm.controls['name'].value,
      lastname: this.miCuentaForm.controls['lastname'].value,
      sexo: this.miCuentaForm.controls['sexo'].value,
      phone: this.miCuentaForm.controls['phone'].value,
      phoneWsp: this.miCuentaForm.controls['phoneWsp'].value,
      campus: this.miCuentaForm.controls['campus'].value,
      image: this.miCuentaForm.controls['image'].value,
    };
  }
  validateFormFunction() {
    console.log(this.miCuentaForm);

    if (this.miCuentaForm.invalid) {
      this.validateForm = true;
      return;
    }
  }
  getUsuario(){
    let params = {
      id: this.userId
    };
    this.callServicesService.getUser(params)
    .subscribe(response =>{
      console.log(response[0]);
      this.name=response[0].name;
      this.lastname = response[0].lastname;
      this.rut = response[0].rut;
      this.sexo = response[0].gender;
      this.mail = response[0].email;
      this.phone = response[0].phonne;
      this.phoneWsp = response[0].wsp;
      this.campus = response[0].campus;
      this.imageUser = response[0].img_data;
      this.imageUser = this.imageUser.slice(2,-1)
      this.imageP = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+this.imageUser);
      this.buildForm()
    });}
    uploadFile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.miCuentaForm.patchValue({
        imageUser: file
      });
      this.miCuentaForm.get('image').updateValueAndValidity()
    }

}
