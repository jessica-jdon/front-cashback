import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RevendedorService } from 'src/app/services/revendedor.service';
import { Router } from '@angular/router';
import { Revendedor } from 'src/app/models/revendedor.model';
import { MASKS, NgBrazilValidators } from 'ng-brazil';


@Component({
  selector: 'app-revendedor',
  templateUrl: './revendedor.component.html',
  styleUrls: ['./revendedor.component.css'],
  providers: [RevendedorService]
})
export class RevendedorComponent implements OnInit {

  public MASKS = MASKS;
  formRevendedor: FormGroup;
  validation: string;
  revendedor: Revendedor;

  constructor(private service: RevendedorService, private form: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formRevendedor = this.form.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, <any>NgBrazilValidators.cpf]],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.formRevendedor.invalid) {
      this.validation = `Verifique os campos obrigatórios!`
      return;
    }
    this.validation = ""
    this.revendedor = this.formRevendedor.value

    this.service.save(this.revendedor)
    .then(
      res => {
        this.validation = `Registro salva com sucesso!`
        this.formRevendedor.reset();
        this.router.navigate(['']);
      }
    )
  }

  onCancel(){
    this.router.navigate(['']);
  }

}
