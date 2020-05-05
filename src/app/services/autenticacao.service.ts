import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService implements CanActivate {
    
  constructor(
      private router: Router
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  | boolean{
      if (!localStorage.getItem('auth')) {
          this.router.navigate(['']);
      }
      return true;

      
  }

  public saveLogin(result: any) {
    localStorage.setItem('revendedor', JSON.stringify(result));
  }

  public doLogout() {
    localStorage.removeItem(`revendedor`);
  }

  public isLoggedIn() {
    let revendedor = JSON.parse(localStorage.getItem('revendedor'));
    if (revendedor != null) {
      return true;
    }
    return false;
  }

  public getNome() {
    let revendedor = JSON.parse(localStorage.getItem('revendedor'));
    if (revendedor != null) {
      return revendedor.nome;
    } else {
      return null;
    }
  }

  public getCPF() {
    let revendedor = JSON.parse(localStorage.getItem('revendedor'));
    if (revendedor != null) {
      return revendedor.cpf;
    } else {
      return null;
    }
  }


}
