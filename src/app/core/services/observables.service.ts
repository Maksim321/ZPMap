import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from "../services/api.service";
import { Marker, Subcategories, Categories } from '../models';

@Injectable()
export class ObservablesService {
  private markers$:Observable<Marker[]>;
  private categories$: Observable<Categories[]>;
  private subcategories$: Observable<Subcategories[]>;

  constructor(private apiService: ApiService) {
  }

  get getMarkers$():Observable<Marker[]> {
    return this.markers$;
  }

  get getCategories$():Observable<Categories[]> {
    return this.categories$;
  }

  get getSubcategories$():Observable<Subcategories[]> {
    return this.subcategories$;
  }

  set setMarkers$(markers$:Observable<Marker[]>) {
    this.markers$ = markers$;
  }

  set setCategories$(categories$:Observable<Categories[]>) {
    this.categories$ = categories$;
  }

  set setSubcategories$(subcategories$:Observable<Subcategories[]>) {
    this.subcategories$ = subcategories$;
  }

  loadingCategories(){
    this.setCategories$ = this.apiService.getCategories$();   
  }

  loadingSubcategories(uidCategory:string){
    this.setSubcategories$ = this.apiService.getSubcategories$(uidCategory);   
  }

  loadingMarkers(property:string, value:string){
    this.setMarkers$ = this.apiService.getMarkers$(property, value);   
  }
}
