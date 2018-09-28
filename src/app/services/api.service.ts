import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Marker } from '../marker';
import { Subcategories } from '../subcategories';
import { Categories } from '../categories';

export class selectedMarkers {
  uid:string;
  selectedMarkers: Observable<Marker[]>;
}

export class selectedCategories {
  uidCategory:string;
  selectedCcategories: Observable<Categories[]>;
}

export class selectedSubcategories {
  uidCategory:string;
  selectedSubcategories: Observable<Subcategories[]>;
}

@Injectable()
export class ApiService {

  private categoriesObservable:Observable<Categories[]>;
  private subcategoriesObservableArray:selectedSubcategories[] = [];
  private markersObservableArray: selectedMarkers[] = [];

  constructor(private afStore: AngularFirestore,
              private afStorage: AngularFireStorage) {
    this.categoriesObservable = this.getCategoriesCollection();
  }

  get getCategoriesObservable():Observable<Categories[]> {
    return this.categoriesObservable;
  }

  private getCategoriesCollection():Observable<Categories[]>{
    return this.afStore.collection<Categories>('/Categories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidCategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  private getSubcategoriesCollection(uidCategories):Observable<Subcategories[]>{
    return this.afStore.collection<Subcategories>('Categories/'+uidCategories+'/Subcategories').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ uidSubcategory: c.payload.doc.id, ...c.payload.doc.data() 
      }));
    }));
  }

  private getMarkers(property, value):Observable<Marker[]>{
    return this.afStore.collection<Marker>('/Points', ref => 
      ref.where(property, '==', value)).valueChanges();
  }

  getSubcategoriesObservable(uidCategory):Observable<Subcategories[]>{
    if(this.subcategoriesObservableArray.filter(obj => obj.uidCategory === uidCategory).length){
      console.log('fromArray');
      return this.subcategoriesObservableArray.filter(obj => 
        obj.uidCategory === uidCategory)[0].selectedSubcategories;
    }
    else{
      console.log('fromFire');
      let observable = this.getSubcategoriesCollection(uidCategory);
      this.subcategoriesObservableArray.push({uidCategory:uidCategory, selectedSubcategories: observable});
      return observable;
    }
  }   

  getMarkersObservable(property, uid){
    if(this.markersObservableArray.filter(obj => obj.uid === uid).length){
      console.log('fromArray Marker');
      return this.markersObservableArray.filter(obj => obj.uid === uid)[0].selectedMarkers;
    }
    else{
      console.log('fromFire Marker');
      let observable = this.getMarkers(property, uid)
      this.markersObservableArray.push({uid:uid, selectedMarkers: observable});
      return observable;
    }
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
