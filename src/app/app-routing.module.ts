import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevendedorComponent } from './components/revendedor/revendedor.component';
import { CompraComponent } from './components/compra/compra.component';
import { LoginComponent } from './components/login/login.component';
import { AutenticacaoService } from './services/autenticacao.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'revendedor', component: RevendedorComponent },
  { path: 'compras', component: CompraComponent, canActivate: [AutenticacaoService] },
  //{ path: '**', redirectTo: 'auth/404' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
