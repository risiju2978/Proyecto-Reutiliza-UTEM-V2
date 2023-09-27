import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { SessionService } from './../../../core/services/session.service';
import { Evaluacion } from '../../../interfaces/evaluaciones';
import { CallServicesService } from './../../../services/call-services.service'
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  //name: string = this.sessionService.name
  //userId: string = this.sessionService.userId
  //lastname: string = this.sessionService.lastname
  //image: string = this.sessionService.img_data
  @Input('rating') private rating: number;
  @Input('starCount') private starCount: number = 5;
  private ratingArr = [];
  public informacion = [];
  public comentary;
  public name_from;
  public img;
  imageP: any;
  promedio;
  puntaje: string;
  name: string; 
  userId: string; 
  lastname: string; 


  constructor(
    private sessionService: SessionService,
    private callServicesService: CallServicesService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = "1";
    this.name = "Gina"; // Despues se llama a name solamente
    this.lastname = "Garrido";
    this.getEvaluaciones();
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  getEvaluaciones(){
    let params = {
      id_to_user: this.userId
    };
    let paramsScore = {
      score: this.userId
    };
    this.callServicesService.getAllEvaluaciones(paramsScore)
    .subscribe(response =>{
      this.promedio = response;
      parseInt(this.promedio)
      this.promedio = this.promedio.toFixed(1)
      this.rating = Math.round(this.promedio); 
    });

    this.callServicesService.getAllEvaluaciones(params)
    .subscribe(response =>{
      for(let i=0; i<response.length;i++){
        let datas = []
        this.puntaje = response[i].score;
        this.comentary = response[i].commentary;
        this.name_from = response[i].nameFrom+' '+response[i].lastnameFrom;
        this.img = response[i].img_data;
        this.img = this.img.slice(2,-1)
        this.imageP = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+this.img);

        datas.push(this.name_from,this.comentary,this.imageP, this.puntaje) 
        this.informacion.push(datas)
      }
    });
  }
  // onClick(rating:number) {
  //   console.log(rating)
  //   this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
  //     duration: this.snackBarDuration
  //   });
  //   this.ratingUpdated.emit(rating);
  //   return false;
  // }
  
  showIcon(index:number) {
      if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  showIcon2(index:number, rating2: number) {
      if (rating2 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}

