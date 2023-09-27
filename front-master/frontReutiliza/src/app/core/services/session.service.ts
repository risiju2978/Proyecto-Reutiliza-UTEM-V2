
import { Injectable } from '@angular/core';
import { TokenResponse } from './../../interfaces/token-response';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  get userId(): string {
    return sessionStorage.getItem('id');
  }

  set userId(userId: string) {
    sessionStorage.setItem('id', userId);
  }

  get userRut(): string {
    return sessionStorage.getItem('rut');
  }

  set userRut(userRut: string) {
    sessionStorage.setItem('rut', userRut);
  }

  get name(): string {
    return sessionStorage.getItem('name');
  }
  set name(name: string) {
    sessionStorage.setItem('name', name);
  }

  get lastname(): string {
    return sessionStorage.getItem('lastname');
  }

  set lastname(lastname: string) {
    sessionStorage.setItem('lastname', lastname);
  }

  get email(): string {
    return sessionStorage.getItem('email');
  }

  set email(email: string) {
    sessionStorage.setItem('email', email);
  }

  get campus(): string {
    return sessionStorage.getItem('campus');
  }

  set campus(campus: string) {
    sessionStorage.setItem('campus', campus);
  }

  get is_admin(): string {
    return sessionStorage.getItem('is_admin');
  }

  set is_admin(is_admin: string) {
    sessionStorage.setItem('is_admin', is_admin);
  }

  get img_data(): string {
    return sessionStorage.getItem('img_data');
  }

  set img_data(img_data: string) {
    sessionStorage.setItem('img_data', img_data);
  }


  public get accessToken(): string {
    return sessionStorage.getItem('access_token');
  }
  public set accessToken(value: string) {
    sessionStorage.setItem('access_token', value);
  }
  public get tokenType(): string {
    return sessionStorage.getItem('token_type');
  }
  public set tokenType(value: string) {
    sessionStorage.setItem('token_type', value);
  }
  public get refreshToken(): string {
    return sessionStorage.getItem('refresh_token');
  }
  public set refreshToken(value: string) {
    sessionStorage.setItem('refresh_token', value);
  }
  public get expiresIn(): number {
    return +sessionStorage.getItem('expires_in');
  }
  public set expiresIn(value: number) {
    sessionStorage.setItem('expires_in', value.toString());
  }
  public get(): number {
    return +sessionStorage.getItem('date_token');
  }

  public set dateToken(value: number) {
    sessionStorage.setItem('date_token', value.toString());
  }

  public get dateToken(): number {
    return +sessionStorage.getItem('date_token');
  }

  public set dateInitLogin(value: number) {
    sessionStorage.setItem('date_init_login', value.toString());
  }
  public get dateInitLogin(): number {
    return +sessionStorage.getItem('date_init_login');
  }
  public set dateLastUpdate(value: number) {
    sessionStorage.setItem('date_last_update', value.toString());
  }
  public get dateLastUpdate(): number {
    return +sessionStorage.getItem('date_last_update');
  }
  public set refreshExpiresIn(value: number) {
    sessionStorage.setItem('refresh_expires_in', value.toString());
  }
  public get refreshExpiresIn(): number {
    return +sessionStorage.getItem('refresh_expires_in');
  }
  public set inactivityExpiresIn(value: number) {
    sessionStorage.setItem('inactivity_expires_in', value.toString());
  }
  public get inactivityExpiresIn(): number {
    return +sessionStorage.getItem('inactivity_expires_in');
  }

  public get client(): string {
    return sessionStorage.getItem('client');
  }
  public set client(value: string) {
    sessionStorage.setItem('client', value.toString());
  }
  public get authenticated(): boolean {
    const access = this.accessToken;
    if (access === null) {
      return false;
    } else {
      return true;
    }
  }

  public get keepAlive(): number {
     return +sessionStorage.getItem('keep_alive');
  }

  public set keepAlive(value: number) {
    sessionStorage.setItem('keep_alive', value.toString());
  }

  public setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return sessionStorage.getItem(key);
 }

  public clearSession() {
    sessionStorage.clear();
  }

  public saveSession(tokenResponse: TokenResponse, authHeader: string) {
    const DeltaInSeconds = 10;
    this.accessToken = tokenResponse.access_token;
    this.expiresIn = tokenResponse.expires_in;
    this.refreshToken = tokenResponse.refresh_token;
    this.tokenType = tokenResponse.token_type;
    this.dateToken = Math.round(new Date().getTime() / 1000);
    this.dateLastUpdate = Math.round(new Date().getTime() / 1000);
    this.dateInitLogin = Math.round(new Date().getTime() / 1000);
    this.client = authHeader;
    this.refreshExpiresIn = Number(tokenResponse.refresh_expires_in) - DeltaInSeconds;
    this.inactivityExpiresIn = Number(tokenResponse.inactivity_expires_in) - DeltaInSeconds;
  }

  public isSessionActive(): boolean {
    return this.refreshToken != null;
  }
}
