import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import * as $ from 'jquery';

import { ObservablesService } from "./observables.service";

import { Subcategories, Categories } from '../models';

@Injectable()
export class MenuService {

  private menuStatus:boolean = false;
  private selectedCategoriesUID:string;
  private selectedSubcategoriesUID:string;

  constructor(private mapService: MapService,
              private observables: ObservablesService) {}

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

  getMarkersByCategory(uidCategory:string){
    this.selectMarkers("uidCategory", uidCategory);  
  }

  getMarkersBySubcategory(uidCategory:string){
    this.selectMarkers("uidSubcategory", this.getSelectedSubcategoriesUID);   
  }   

  private selectSubcategories(uidCategory){
    this.observables.loadingSubcategories(uidCategory);
    this.getMarkersByCategory(uidCategory);
  }

  private selectMarkers(property, value){
    this.observables.loadingMarkers(property, value);
    this.observables.getMarkers$.subscribe(markers=>{
      this.mapService.placeArrayMarkers(markers, this.selectedCategoriesUID);      
    });
  }

  clearMarkers(){
    this.mapService.deleteMarkers();
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
      $('.left-menu').animate({marginLeft:0 - $(".left-menu").width() + 
        $(".menu-container .menu-categories").width()}, 200,
        ()=>resolve(true));
    });     
  }
}
