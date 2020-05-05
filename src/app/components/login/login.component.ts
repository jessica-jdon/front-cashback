import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Revendedor } from 'src/app/models/revendedor.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { RevendedorService } from 'src/app/services/revendedor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, RevendedorService]
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  revendedor: Revendedor = new Revendedor();
  validation: string;

  form = new FormGroup({});

  constructor(
    private service: LoginService,
    private revendedorService: RevendedorService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }

  acessar() {
    if (this.form.invalid) {
      this.validation = `Verifique os campos obrigatórios!`
      return;
    }
    
      const usuario = Object.assign(this.revendedor, this.form.value);

      this.revendedorService.get(usuario).subscribe( listr => {
        if(listr.length <= 0){   
          EventEmitterService.get('login').emit(false);
          this.validation = `Erro ao logar, verifique se usuário e senha estão corretos`
          return;
        } else {
          const auth = this.service.fazerLogin(listr[0]);
          localStorage.setItem('auth', JSON.stringify(true));
          EventEmitterService.get('login').emit(true);
          this.router.navigate(['compras']);
        }
      })
  }

  abrirCadastro() {
      this.router.navigate(['revendedor']);
  }

  limpamsg() {
    this.validation = "";
  }

}
