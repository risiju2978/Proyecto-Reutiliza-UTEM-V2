import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserTableAdmin } from '../../../../interfaces/userTableAdmin'
import { CallServicesService } from './../../../../services/call-services.service';

@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.component.html',
  styleUrls: ['./adm-users.component.css']
})
export class AdmUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'evaluation', 'numberActiveNotices', 'numberCloseNotices', 'numberObtainNotices','actions'];
  dataSource: MatTableDataSource<UserTableAdmin>;
  public listaTablaDeUsuarios = []
  private vista = 'activos'
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private callServicesService: CallServicesService) {
    this.getManageUsers('inicial')
   }

  ngOnInit() {
  }

  getManageUsers(p){
    let params = {
      is_active: 1,
      is_admin: 0
    };
    switch(p) {
      case "admin":
        this.vista = 'activos'
        document.getElementById("administradores_link").style.fontWeight = "bold";
        document.getElementById("usuarios_activos_link").style.fontWeight = "normal";
        document.getElementById("usuarios_no_activos_link").style.fontWeight = "normal";
        params.is_admin = 1;
        break
      case "not active":
        this.vista = 'no activos'
        document.getElementById("usuarios_no_activos_link").style.fontWeight = "bold";
        document.getElementById("usuarios_activos_link").style.fontWeight = "normal";
        document.getElementById("administradores_link").style.fontWeight = "normal";
        params.is_active = 0;
        break
      case "active":
        this.vista = 'activos'
        document.getElementById("usuarios_activos_link").style.fontWeight = "bold";
        document.getElementById("usuarios_no_activos_link").style.fontWeight = "normal";
        document.getElementById("administradores_link").style.fontWeight = "normal";
        break
    }
    this.callServicesService.getManageUsers(params)
    .subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  disableUser(row) {
    this.callServicesService.desactivate_user(row.id).subscribe(
      (response) => {
        this.dataSource.data = this.dataSource.data.filter((value,_)=>{
          return value.id != row.id;
        });
        alert(response.message)
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }

  enableUser(row) {
    this.callServicesService.activate_user(row.id).subscribe(
      (response) => {
        this.dataSource.data = this.dataSource.data.filter((value,_)=>{
          return value.id != row.id;
        });
        alert(response.message)
      },
      (error) => {
        alert(error.error.message)
      }
    )
  }

}
