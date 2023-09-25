//import { Component } from '@angular/core';



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-publicar-aviso',
  templateUrl: './publicar-aviso.component.html',
  styleUrls: ['./publicar-aviso.component.css']
})
export class PublicarAvisoComponent {

}



/*import { ToastrService } from 'ngx-toastr';
import { Storage, ref, uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage';
import { ServicioConeccionService } from '../servicio-coneccion.service';


export class AgregarMueblesComponent implements OnInit {
  AgregarMuebles: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
    public titulo!: boolean;
    images: string[] = [];
    
  
  
  
    constructor(private fb: FormBuilder,
                  private _ServicioConeccionService: ServicioConeccionService,
                   private router: Router,
                    private toastr: ToastrService,
                    private aRoute: ActivatedRoute,
  
                    private storage: Storage) { 
                    this.AgregarMuebles = this.fb.group({
        Nombre:['', Validators.required],
        Descripcion:['', Validators.required],
        Precio:['', Validators.required],
        Foto:['', Validators.required],
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
                  
    }
  
    ngOnInit(): void {
      this.EditarMueble();
      this.getImages();
    }
  
   
  
  subirArchivo($event: any) {
   const file = $event.target.files[0];
   const imgRef = ref(this.storage, 'image/${file.name}');
  
   uploadBytes(imgRef, file).then((x) =>{
    this.getImages();
   }).catch((_error: any) => {
    this.toastr.error('Hubo un error al subir la imagen','ERROR',{positionClass: 'toast-bottom-right'});
  })
  
  }
  getImages()
  {
    const imageRef = ref(this.storage, 'images');
  
    listAll(imageRef).then(async images =>{
      this.images = [];
      for(let image of images.items){
        const url = await getDownloadURL(image);
        this.images.push(url);
      }
  
    }).catch((_error: any) => {
      this.toastr.error('Hubo un error al mostrar el producto','ERROR',{positionClass: 'toast-bottom-right'});
    })
   }
  
  
  
  
    agregarEditarMueble(){
      this.submitted = true;
      if(this.AgregarMuebles.invalid){
        return;
      }
      if(this.id === null){
        this.Agregar_mueble();
         
      }else{
        this.EditarMuebleAhora(this.id);
      }
    }
  Agregar_mueble(){
    this.titulo = true;
    this.submitted = true;
    if(this.AgregarMuebles.invalid){
      return;
    }
    const mueble: any ={
      Nombre: this.AgregarMuebles.value.Nombre,
      Descripcion: this.AgregarMuebles.value.Descripcion,
      Precio: this.AgregarMuebles.value.Precio,
      Foto: this.AgregarMuebles.value.Foto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._ServicioConeccionService.AgregarMuebles(mueble).then(()=>{
      this.toastr.success('¡El mueble fue registrado con exito!', 'Mueble agregado al catalogo',{
        positionClass: 'toast-bottom-right'
      })
       
    
      this.loading = false;
      this.router.navigate(['/crud']);
    }).catch((_error: any) => {
      this.toastr.error('Hubo un error al agregar el producto','ERROR',{positionClass: 'toast-bottom-right'});
      this.loading = false;
    })
    
  }
  EditarMuebleAhora(id: string){
    const mueble: any ={
      Nombre: this.AgregarMuebles.value.Nombre,
      Descripcion: this.AgregarMuebles.value.Descripcion,
      Precio: this.AgregarMuebles.value.Precio,
      Foto: this.AgregarMuebles.value.Foto,
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._ServicioConeccionService.ActualizarMueble(id, mueble ).then(() =>{
      this.loading = false;
      this.toastr.info('El producto fue modificado con exito','Producto modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/crud']);
    }).catch((_error: any) => {
      this.toastr.error('Hubo un error al modificar el producto','ERROR',{positionClass: 'toast-bottom-right'});
      this.loading = false;
  })
  }
  EditarMueble(){
    this.titulo = false;
    if(this.id !== null){
      this.loading = true;
      this._ServicioConeccionService.getMuebleEdit(this.id).subscribe(data =>{
       this.loading = false;
        this.AgregarMuebles.setValue({
          Nombre: data.payload.data()['Nombre'],
          Descripcion: data.payload.data()['Descripcion'],
          Precio: data.payload.data()['Precio'],
          Foto: data.payload.data()['Foto'],
        })
      })
    }
  }
  }
  
  */