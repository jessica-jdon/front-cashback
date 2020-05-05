import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-bar-info',
  templateUrl: './bar-info.component.html',
  styleUrls: ['./bar-info.component.css'],
  providers: [AutenticacaoService, LoginService]
})
export class BarInfoComponent implements OnInit {

  nome: string;
  cashbasckAcumulado: number;

  constructor(private autService : AutenticacaoService, private loginService : LoginService) { }

  ngOnInit() {
    this.nome = this.autService.getNome();
    this.cashbasckAcumulado = 100.00;
  }

  logout() {
		this.loginService.fazerLogoff();
	}

}
