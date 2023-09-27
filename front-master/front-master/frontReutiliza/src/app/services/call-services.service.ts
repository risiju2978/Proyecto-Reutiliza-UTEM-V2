import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Publicacion } from './../interfaces/publicacion'
import { ResponseSuccess } from '../interfaces/response_success'
import { Categoria } from '../interfaces/categoria'
import {UserTableAdmin} from '../interfaces/userTableAdmin'
import { Evaluacion } from './../interfaces/evaluaciones';
import { ComunasRegiones} from '../interfaces/comunasRegiones'

@Injectable({
  providedIn: 'root'
})
export class CallServicesService {

  url = 'http://127.0.0.1:5000'

  constructor(
    private http: HttpClient
  ) { }

  // Publicaciones
  getAllPublicaciones(params) {
    return this.http.get<Publicacion[]>(this.url+'/getNotice',{params: params});  
  }

  // Evaluaciones
  getAllEvaluaciones(params) {
    return this.http.get<Evaluacion[]>(this.url+'/getEval',{params: params});  
  }

  // Usuarios
  addUser(formData) {
    return this.http.post<ResponseSuccess>(this.url+'/addUser', formData)
  }

  getUser(params) {
    return this.http.get<ResponseSuccess>(this.url+'/getUsers', {params: params})
  }

  desactivate_user(id) {
    return this.http.post<ResponseSuccess>(this.url+'/desactivate_user/'+id,"");
  }
  activate_user(id) {
    return this.http.post<ResponseSuccess>(this.url+'/activate_user/'+id,"");
  }
  getManageUsers(params){
    return this.http.get<UserTableAdmin[]>(this.url+'/manage_users', {params: params});  
  }

  // Categorias
  getAllCategorias() {
    return this.http.get<Categoria[]>(this.url+'/getCategory');  
  }
  addCategoria(formData) {
    return this.http.post<ResponseSuccess>(this.url+'/addCategory', formData)
  }
  deleteCategoria(id) {
    return this.http.delete<ResponseSuccess>(this.url+'/category/'+id);  
  }

  // Comunas / regiones
  getAllComunas(params) {
    return this.http.get<ComunasRegiones[]>(this.url+'/getComunnes',{params: params});  
  }

  
}
