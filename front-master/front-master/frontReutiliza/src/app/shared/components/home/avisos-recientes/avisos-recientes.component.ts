import { Component, OnInit } from '@angular/core';
import { CallServicesService } from './../../../../services/call-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-avisos-recientes',
  templateUrl: './avisos-recientes.component.html',
  styleUrls: ['./avisos-recientes.component.css']
})
export class AvisosRecientesComponent implements OnInit {
  public images = [];
  image: SafeResourceUrl = null;
  title = 'Avisos recientes';
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: false,
    dots: false,
    rtl:true,
    margin:0,  
    navSpeed: 700,
    autoplay: true,
    center: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      188: {
        items: 2
      },
      376: {
        items: 3
      },
      569: {
        items: 4
      },
      752: {
        items: 5
      }
    },
    nav: true
  }

  constructor(
    private callServicesService: CallServicesService,
    private sanitizer: DomSanitizer
  ){
    this.getPublicaciones()
  }
  ngOnInit() {
  }

  getPublicaciones(){
    let params = {
        recent: "si"
    };
    
    this.callServicesService.getAllPublicaciones(params)
    .subscribe(response => {
      response.forEach(publicacion => {
        var data = publicacion.images_notice[0]
        data = data.slice(2,-1)
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+data);
        this.images.push({
          "titulo": publicacion.title,
          "image": this.image
        });
      });
    });
  }
}
