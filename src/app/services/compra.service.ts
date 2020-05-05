import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Compra } from '../models/compra.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  compras: AngularFirestoreCollection<Compra>;

  constructor(private afs: AngularFirestore) {
    this.compras = afs.collection<Compra>('compras')
  }

  getAllCompras(): Observable<Compra[]> {
    return this.afs.collection<Compra>('compras', ref =>
      ref.orderBy('data', 'asc'))
      .valueChanges()
  }

  save(compra: Compra): Promise<void> {
    return this.compras.add(Object.assign({}, compra)).then(objeto => {
      compra.idCompra = objeto.id
      this.update(compra)
    })
  }

  update(compra: Compra): Promise<void> {
    return this.compras.doc(compra.idCompra)
      .update(Object.assign({}, compra))
  }

  delete(compra: Compra): Promise<void> {
    return this.compras.doc(compra.codigo)
      .delete()
  }
}
