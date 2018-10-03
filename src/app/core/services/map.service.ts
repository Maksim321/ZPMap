import { Injectable, NgZone } from '@angular/core';
import { ApiService } from "./api.service";

import { Marker, Subcategories, Categories, Point } from '../models';

@Injectable()
export class MapService {
  
  private map: any;
  private markers: Array<any> = [];
  private geocoder: any;
  private currentMarker: Point = { Address: '', Lat: 0, Lon: 0, };

  constructor(private ngZone: NgZone,
              private apiService: ApiService) {
	  this.geocoder = new google.maps.Geocoder();
  }
  

  get getMap() {
    return this.map;
  }

  get getcurrentMarker(): Point {
  	return this.currentMarker;
  }

  initMap(mapContainer: HTMLElement) {
    this.ngZone.runOutsideAngular(() => {
  	  this.map = new google.maps.Map(mapContainer, {
  		  center: {lat: 47.85589, lng: 35.16031},
  		  zoom: 12,
    		mapTypeControlOptions: {
      	  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    		},
      	zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
      	},
      	streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
      	}
  	  });
    });
  }
  
  initMapClickEvents() {
    this.initMapMouseEvents('click');
  }

  initMapMouseMoveEvents() {
    this.initMapMouseEvents('mousemove');
  }

  private initMapMouseEvents(event) {
    google.maps.event.addListener(this.map, event, (event)=> {
      this.geocoder.geocode({'latLng': event.latLng}, (results, status)=> {
        if (status === google.maps.GeocoderStatus.OK&&results[0]) {
          this.currentMarker = {
            "Address": results[0].formatted_address,
            "Lat": event.latLng.lat(),
            "Lon": event.latLng.lng()
          }
        }
      });
    });
  }  
  
  setMarker(point:Point){
    return new Promise<any>((resolve, reject) => {
      resolve(new google.maps.Marker({ 
              position: new google.maps.LatLng(point.Lat, point.Lon),
              map: this.map})
      );
    });
  }
  
  private setInfoWindowMap(marker, contentString){
  	google.maps.event.addListener(marker, 'click', ((marker)=>{
        return ()=>{
          let infowindow = new google.maps.InfoWindow({content: contentString});
          infowindow.open(this.map, marker);
        }
    })(marker));
  }
 
  deleteMarkers() {
    this.markers.forEach((value, index)=>{
      this.markers[index].setMap(null);
    });
    this.markers = [];
  }
  
  teleportToMarker(point:Point){
    this.getMap.panTo(new google.maps.LatLng(point.Lat, point.Lon));
    this.getMap.setZoom(17);
  }
  
  private getCategoryName(categories, uidCategory:string){
    for(let category of categories){
      if(category.uidCategory === uidCategory)
        return category.NameCategories;
    }
  }

  private getSubcategoryName(subcategories, uidSubcategory:string){
    for(let subcategory of subcategories){
      if(subcategory.uidSubcategory === uidSubcategory){
        return subcategory.NameSubcategories;
      }      
    }
  }

  private checkImage(image){
    return new Promise<any>((resolve, reject) => {
      if(image){
        this.apiService.convertImage(image).subscribe(value=>{
          resolve(value);
        });
      }else{
        resolve("assets/img/no_photo.jpg");
      }      
    });    
  }

  placeArrayMarkers(arrayMarkets:Marker[], categories, subcategories) {
    let markers = [];
    arrayMarkets.forEach(marker=>{
      this.setMarker(marker.Point).then((point)=>{
        markers.push(point);
        this.checkImage(marker.Image).then((image)=>{
          this.setInfoWindowMap(point, 
            this.createHtmlContent(marker,
              this.getCategoryName(categories, marker.uidCategory),
              this.getSubcategoryName(subcategories, marker.uidSubcategory), 
              image
            )
          );
        });        
      });
    });
    this.deleteMarkers();
    this.markers = markers;
  }

  private createHtmlContent(marker:Marker, categories:string,subcategories:string, image){
	  return  '<div class="infowindow">'+
						  '<div class="infowindow-wrapper">'+
						    '<div class="photos">'+
						      '<img src="'+image+'">'+
						    '</div>'+
  						  '<h3>'+marker.Title+'</h3>'+
  						  '<ul>'+
                  '<li><b>Категория:</b> '+categories+'</li>'+
                  '<li><b>Подкатегория:</b> '+subcategories+'</li>'+
  							  '<li><b>Адрес:</b> '+marker.Point.Address+'</li>'+
  							  '<li><b>Добавил:</b> '+marker.NameCreator+'</li>'+
  							  '<li><b>Описание:</b></br> '+marker.Description+'</li>'+
  						  '</ul>'+
						  '</div>'+
						'</div>';
  } 
}
