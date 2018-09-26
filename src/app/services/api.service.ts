import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Marker } from '../marker';
import { Subcategories } from '../subcategories';
import { Categories } from '../categories';

@Injectable()
export class ApiService {

  arrayCategories: Observable<Categories[]>;
  arraySubcategories: Observable<Subcategories[]>;

  arrayCategoriesCollection: AngularFirestoreCollection<Categories>;
  arraySubcategoriesCollection: AngularFirestoreCollection<Subcategories>;
  arrayPointsCollection: AngularFirestoreCollection<Marker>;

  constructor(private afStore: AngularFirestore,
              private afStorage: AngularFireStorage) {}


  getCategoriesCollection():Observable<Categories[]>{
    return this.afStore.collection<Categories>('/Categories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidCategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  getSubcategoriesCollection(uidCategories):Observable<Subcategories[]>{
    return this.afStore.collection<Subcategories>('Categories/'+uidCategories+'/Subcategories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidSubcategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  getMarkers(property, value):Observable<Marker[]>{
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
