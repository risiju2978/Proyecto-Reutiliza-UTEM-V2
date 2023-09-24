/*import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.isAdminLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/iniciar-sesion']); // Redirige a la página de inicio de sesión si no está autenticado.
      return false;
    }
  }
}
*/