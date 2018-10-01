import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { SubscribingToDataService } from "./subscribing-to-data.service";
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

  constructor(private mapService: MapService,
              private subscribingToDataService: SubscribingToDataService) {}

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

  private selectSubcategories(uidCategory){
    this.subscribingToDataService.selectSubcategories(uidCategory).then(()=>{
      this.getMarkersByCategory(uidCategory);
    });   
  }

  private selectMarkers(property, value){
    if(property&&value){
      this.subscribingToDataService.selectMarkers(property, value).then(markers=>{
        this.clearMarkers();
        this.mapService.placeArrayMarkers(markers, 
          this.subscribingToDataService.getSelectedCategories, 
          this.subscribingToDataService.getSelectedSubcategories
        );
      });
    }
  }

  closeMenu(){
    this.setMenuStatus = false;
  }

  openMenu(uidCategory){
    this.setMenuStatus = true;
    this.setSelectedSubcategoriesUID = "";
    this.setSelectedCategoriesUID = uidCategory;
    this.selectSubcategories(uidCategory);
  }

  hideMenu(){
    return new Promise<boolean>((resolve, reject) => {
      $('.left-menu').animate({marginLeft: - $(".left-menu").width()},200,()=>{
        this.setMenuStatus = false;
        resolve(true)
      });
    });     
  }

  showMenu(){
    return new Promise<boolean>((resolve, reject) => {
      $('.left-menu').animate({marginLeft:0 - $(".left-menu").width() + $(".tabs nav").width()}, 200,
        ()=>resolve(true));
    });     
  }

  clearMarkers(){
    this.mapService.deleteMarkers();
  } 
}
