import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Marker, Subcategories, Categories } from '../models';

@Injectable()
export class ApiService {

  private categoriesObservable:Observable<Categories[]>;

  constructor(private afStore: AngularFirestore,
              private afStorage: AngularFireStorage) {
    this.categoriesObservable = this.getCategoriesObservableP();
  }

  get getCategoriesObservable():Observable<Categories[]> {
    return this.categoriesObservable;
  }

  private getCategoriesObservableP():Observable<Categories[]>{
    return this.afStore.collection<Categories>('/Categories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidCategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  getSubcategoriesObservable(uidCategories):Observable<Subcategories[]>{
    return this.afStore.collection<Subcategories>('Categories/'+uidCategories+'/Subcategories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidSubcategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  getMarkersObservable(property, value):Observable<Marker[]>{
    return this.afStore.collection<Marker>('/Points', ref => 
      ref.where(property, '==', value)).valueChanges();
  }  

  addMarker(points){
    return this.afStore.collection<Marker>('/Points').add(points);
  }

  uploadImage(pathImage, file, customMetadata){
    return this.afStorage.upload(pathImage, file, { customMetadata });    
  }

  convertImage(image){
    return this.afStorage.ref(image).getDownloadURL();
  }  
}
