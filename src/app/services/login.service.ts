import { Injectable, EventEmitter } from '@angular/core';
import { AutenticacaoService } from './autenticacao.service';
import { Router } from '@angular/router';
import { EventEmitterService } from './event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private autService: AutenticacaoService
) { }


isAuthenticated = new EventEmitter<boolean>();

revendedor: any;

fazerLogoff() {
  this.router.navigate(['']).then(
      () => {
          localStorage.clear();
          this.isAuthenticated.emit(false);
          EventEmitterService.get('logout').emit(true);     
      },
      error => {
          console.log('deu erro');
      }
  );

}

  fazerLogin(revendedor) {

    this.autService.saveLogin(revendedor);
    this.isAuthenticated.emit(true)
  }
}
