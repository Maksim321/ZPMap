import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from "../services/api.service";
import { Marker, Subcategories, Categories } from '../models';

@Injectable()
export class SubscribingToDataService {
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
      this.apiService.getSubcategoriesObservable(uidCategory).subscribe(selectedSubcategories=>{
      	this.selectedSubcategories = selectedSubcategories;
        resolve(selectedSubcategories);
      });
    }); 
  }

  selectMarkers(property, value){
  	return new Promise<Marker[]>((resolve, reject) => {
  	  this.apiService.getMarkersObservable(property, value).subscribe(markers=>{
  	    this.selectedMarkers = markers;
  	    resolve(markers);
  	  });
    }); 
  } 

  deleteMarkers(){
    this.selectedMarkers = [];
  }
}
