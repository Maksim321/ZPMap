import { Injectable } from '@angular/core';
import { MapService } from '../services/map.service';
import { ApiService } from "../services/api.service";
import * as $ from 'jquery';

import { Marker } from '../marker';
import { Subcategories } from '../subcategories';
import { Categories } from '../categories';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuStatus:boolean = false;
  private selectedCategoriesUID:string;
  private selectedSubcategoriesUID:string;

  selectedMarkers:Marker[] = [];
  selectedCategories: Categories[];
  selectedSubcategories: Subcategories[];

  constructor(private menuService: MenuService,
              private mapService: MapService,
              private apiService: ApiService) {
    this.apiService.getCategoriesCollection().subscribe(selectedCategories => this.selectedCategories = selectedCategories);

	  window.addEventListener('resize', ()=> {
      if(!this.getMenuStatus){
  		  $(".left-menu").css( "margin-left" , -$(".left-menu").width()+ $(".tabs nav").width());
  	  }
  	}, false);
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

  get getMenuStatus():boolean {
    return this.menuStatus;
  }

  get getSelectedCategoriesUID():string {
    return this.selectedCategoriesUID;
  }

  get getSelectedSubcategoriesUID():string {
    return this.selectedSubcategoriesUID;
  }

  set setMenuStatus(value: boolean) {
	  this.menuStatus = value;
  }

  set setSelectedCategoriesUID(value: string) {
	  this.selectedCategoriesUID = value;
  }

  set setSelectedSubcategoriesUID(value: string) {
    this.selectedSubcategoriesUID = value;
  }

  getMarkersByCategory(uidCategory){
    this.selectMarkers("uidCategory", uidCategory);  
  }

  getMarkersBySubcategory(){
    this.selectMarkers("uidSubcategory", this.getSelectedSubcategoriesUID);  
  }   

  selectSubcategoriesCollection(uidCategory){
    this.apiService.getSubcategoriesCollection(uidCategory)
      .subscribe(selectedSubcategories => this.selectedSubcategories = selectedSubcategories);
  }

  selectMarkers(property, value){
    if(property&&value){
      this.apiService.getMarkers(property, value).subscribe(markers => {
        this.selectedMarkers = markers;
        this.mapService.placeArrayMarkers(markers, this.selectedCategories, this.selectedSubcategories);   
      });  
    }
  } 

  openMenu(uidCategory){
  	if(this.getMenuStatus && this.getSelectedCategoriesUID === uidCategory){
  	  $(".left-menu").animate({marginLeft:0 - $(".left-menu").width() + $(".tabs nav").width()},300);
  	  this.setMenuStatus = false;
  	}
  	else{
  	  $(".left-menu").animate({marginLeft:0},300);

      this.clearPoints();
  	  this.setMenuStatus = true;
      this.setSelectedSubcategoriesUID = "";
      this.setSelectedCategoriesUID = uidCategory;
      this.selectSubcategoriesCollection(uidCategory);
      this.getMarkersByCategory(uidCategory);
  	}
 
  }

  clearPoints(){
    this.selectedMarkers = [];
    this.mapService.deleteMarkers();
  } 
}
