import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from "../services/api.service";

import { Marker } from '../marker';
import { Subcategories } from '../subcategories';
import { Categories } from '../categories';

@Injectable({
  providedIn: 'root'
})
export class SubscribingToDataService {

  private subscribeToSubcategories:any;
  private subscribeToMarkers:any;

  private selectedMarkers:Marker[] = [];
  private selectedCategories: Categories[];
  private selectedSubcategories: Subcategories[];

  constructor(private apiService: ApiService) { 
    this.apiService.getCategoriesObservable.subscribe(selectedCategories=>{
      this.selectedCategories = selectedCategories;
    });
  }

  get getSelectedMarkers():Marker[] {
    return this.selectedMarkers;
  }

  get getSelectedCategories():Categories[] {
    return this.selectedCategories;
  }

  get getSelectedSubcategories():Subcategories[] {
    return this.selectedSubcategories;
  }

  selectSubcategories(uidCategory){
    return new Promise<Subcategories[]>((resolve, reject) => {
      if(this.subscribeToSubcategories)
        this.subscribeToSubcategories.unsubscribe();
      this.subscribeToSubcategories = this.apiService.getSubcategoriesObservable(uidCategory)
      .subscribe(selectedSubcategories=>{
      	this.selectedSubcategories = selectedSubcategories;
        resolve(selectedSubcategories);
      });
      console.log(this.subscribeToSubcategories);
    }); 
  }

  selectMarkers(property, value){
  	return new Promise<Marker[]>((resolve, reject) => {
	  if(this.subscribeToMarkers)
	    this.subscribeToMarkers.unsubscribe();
	  this.subscribeToMarkers = this.apiService.getMarkersObservable(property, value).subscribe(markers=>{
	    this.selectedMarkers = markers;
	    resolve(markers);
	  });
    }); 
  } 
}
