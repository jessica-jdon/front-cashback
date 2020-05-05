import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Compra } from 'src/app/models/compra.model';
import { CompraService } from 'src/app/services/compra.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

declare var require: any;

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
  providers: [AutenticacaoService]
})

export class CompraComponent implements OnInit {

  openCrud: boolean = false
  formCompra: FormGroup;
  compra: Compra;
  compras$: Array<Compra>
  validation: string;
  id: string;
  edit: boolean;

  constructor(private service: CompraService, private form: FormBuilder,private autService : AutenticacaoService) { }

  ngOnInit() {
    this.initForm()
    
    this.service.getAllCompras().subscribe( compras => {
      this.compras$ = compras;
    })
    this.compra = new Compra();
  }

  initForm() {
    this.formCompra = this.form.group({
      codigo: ['', Validators.required],
      valor: ['', Validators.required],
      data: ['', Validators.required],
    });
  }

  saveCompra() {
    if (this.formCompra.invalid) {
      this.validation = `Verifique os campos obrigatórios!`
      return;
    }
    this.compra = this.formCompra.value
    this.compra.status = "Em validação";
    this.compra.percentual = 1;
    this.compra.cashback = 0;
    this.compra.cpfRevendedor = this.autService.getCPF();

    if (!this.edit) {
      this.service.save(this.compra)
        .then(() => {
          this.validation = `Compra salva com sucesso!`;
          this.formCompra.reset();
          this.openCrud = false

          this.compras$.push(this.compra);

        })
        .catch((erro) => { this.validation = `Erro ao salvar a compra: ${erro}` })
    } else {
      this.compra.idCompra = this.id;
      this.service.update(this.compra)
        .then(() => {
          this.validation = `Compra atulizada com sucesso!`;
          this.formCompra.reset();
          this.openCrud = false

        })
        .catch((erro) => { this.validation = `Erro ao atualizar a compra: ${erro}` })
    }
  }

  cancelar() {
    this.openCrud = !this.openCrud;
    this.formCompra.reset();
  }

}
