import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Revendedor } from '../models/revendedor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevendedorService {

  revendedores: AngularFirestoreCollection<Revendedor>;

  constructor(private afs: AngularFirestore) {
    this.revendedores = afs.collection<Revendedor>('revendedores')
  }
  
  getAllRevendedores(): Observable<Revendedor[]> {
    return this.afs.collection<Revendedor>('revendedores', ref =>
      ref.orderBy('nome', 'desc'))
      .valueChanges()
  }

  save(revendedor: Revendedor): Promise<void> {
    return this.revendedores.add(Object.assign({}, revendedor)).then(objeto => {
      revendedor.idRevendedor = objeto.id
      this.update(revendedor)
    })
  }

  update(revendedor: Revendedor): Promise<void> {
    return this.revendedores.doc(revendedor.idRevendedor)
      .update(Object.assign({}, revendedor))
  }

  get(revendedor: Revendedor): Observable<Revendedor[]> {
    return this.afs.collection<Revendedor>('revendedores', ref =>
    ref.where('email', '==', revendedor.email).where('senha', '==', revendedor.senha))
      .valueChanges()
      
  }
}
