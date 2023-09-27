import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './shared/components/home/home.component';
import { InicioComponent } from './shared/components/home/inicio/inicio.component';
import { AvisosRecientesComponent } from './shared/components/home/avisos-recientes/avisos-recientes.component';
import { RouteModule } from './route/route.module';
import { QuienesSomosComponent } from './shared/components/pages/quienes-somos/quienes-somos.component';
import { RegistrateComponent } from './shared/components/pages/registrate/registrate.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InicioComponent,
    AvisosRecientesComponent,
    QuienesSomosComponent,
    RegistrateComponent
  ],
  imports: [
    RouteModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CarouselModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    UsersModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
