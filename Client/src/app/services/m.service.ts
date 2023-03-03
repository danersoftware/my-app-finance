import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  CollectionReference,
  DocumentData,
  collectionData,
  docData,
  updateDoc,
  deleteDoc,
  where,
  query,
  getDocs,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Bill } from '../interfaces/bill.interface';
import { Identity } from '../interfaces/identity.interface';

@Injectable({
  providedIn: 'root',
})
export class MService {
  private billCollection: CollectionReference<DocumentData>;
  private idStore: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.billCollection = collection(firestore, 'bills');
    this.idStore = collection(firestore, 'id_store');
  }

  getAll() {
    return collectionData(this.billCollection, {
      idField: 'id',
    }) as Observable<Bill[]>;
  }

  get(id: string) {
    const billDocumentReference = doc(this.firestore, `bills/${id}`);
    return docData(billDocumentReference, { idField: 'id' });
  }

  async getByDate(date1: any, date2: string) {
    console.log(date1)
    const q = query(
      collection(this.firestore, 'bills'),
      where('enteredDate', '<', date1),
      // where('enteredDate', '>=', date2)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log('My DATA', doc.id, ' => ', doc.data());
    });
  }

  create(bill: Bill) {
    return addDoc(this.billCollection, bill);
  }

  update(bill: Bill) {
    const billDocumentReference = doc(this.firestore, `bills/${bill.id}`);
    return updateDoc(billDocumentReference, { ...bill });
  }

  delete(id: string) {
    const billDocumentReference = doc(this.firestore, `bills/${id}`);
    return deleteDoc(billDocumentReference);
  }

  getLastId() {
    return collectionData(this.idStore, {
      idField: 'id',
    }) as Observable<Identity[]>;
  }

  updateLastId(identity: Identity) {
    const idDocumentReference = doc(
      this.firestore,
      `id_store/vYrUTJL5FuQQTNtxvmxT`
    );
    return updateDoc(idDocumentReference, { ...identity });
  }
}
