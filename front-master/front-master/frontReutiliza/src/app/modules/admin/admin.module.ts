import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AdmUsersComponent } from './components/adm-users/adm-users.component';
import { MatFormFieldModule, MatSelectModule, MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    AdminComponent,
    CategoriasComponent,
    AdmUsersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ]
})
export class AdminModule { }
