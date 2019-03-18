import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Marker, Subcategories, Categories } from '../models';

@Injectable()
export class ApiService {
  constructor(private afStore: AngularFirestore,
              private afStorage: AngularFireStorage) {}

  getCategories$():Observable<Categories[]>{
    return this.afStore.collection<Categories>('/Categories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ NameCategories: c.payload.doc.data().NameCategories,
                                   UrlImageCategories: c.payload.doc.data().UrlImageCategories,
                                   uidCategory: c.payload.doc.id
      }));
    }));
  }

  getSubcategories$(uidCategories:string):Observable<Subcategories[]>{
    return this.afStore.collection<Subcategories>(`Categories/${uidCategories}/Subcategories`).snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidSubcategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  getMarkers$(property, value):Observable<Marker[]>{
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
