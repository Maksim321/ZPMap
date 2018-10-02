import { Injectable, NgZone } from '@angular/core';
import { ApiService } from "./api.service";

import { Marker } from '../marker';
import { Subcategories } from '../subcategories';
import { Categories } from '../categories';
import { Point } from '../point';

@Injectable()
export class MapService {
  
  private map: any;
  private markers: Array<any> = [];
  private geocoder: any;
  private currentMarker: Point = new Point;

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
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(point.Lat, point.Lon),
      map: this.map
    });
  	this.markers.push(marker);
  	return marker;
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
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  
  teleportToMarker(marker:Point){
    this.getMap.panTo(new google.maps.LatLng(marker.Lat, marker.Lon));
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

  private placeMarker(marker:Marker, categoriesName:string,subcategoriesName:string, image){
    this.setInfoWindowMap(
      this.setMarker({Address:"", Lat:marker.Lat, Lon:marker.Lon}), 
      this.createHtmlContent(marker,categoriesName,subcategoriesName, image)
    );    
  }

  placeArrayMarkers(arrayMarkets:Marker[], categories, subcategories) {
    this.deleteMarkers();
    arrayMarkets.forEach(marker=>{
      if(marker.Image){
        this.apiService.convertImage(marker.Image).subscribe(value=>{
          this.placeMarker(marker, 
            this.getCategoryName(categories, marker.uidCategory),
            this.getSubcategoryName(subcategories, marker.uidSubcategory), 
            value);
        });
      }else{
        this.placeMarker(marker, 
          this.getCategoryName(categories, marker.uidCategory),
          this.getSubcategoryName(subcategories, marker.uidSubcategory), 
          "assets/img/no_photo.jpg"
        );
      }
    });
  }

  private createHtmlContent(marker:Marker, categories:string,subcategories:string, image){
	let contentString = '<div class="infowindow">'+
						  '<div class="infowindow-wrapper">'+
						    '<div class="photos">'+
						      '<img src="'+image+'">'+
						    '</div>'+
  						  '<h3>'+marker.Title+'</h3>'+
  						  '<ul>'+
                  '<li><b>Категория:</b> '+categories+'</li>'+
                  '<li><b>Подкатегория:</b> '+subcategories+'</li>'+
  							  '<li><b>Адрес:</b> '+marker.Address+'</li>'+
  							  '<li><b>Добавил:</b> '+marker.NameCreator+'</li>'+
  							  '<li><b>Описание:</b></br> '+marker.Description+'</li>'+
  						  '</ul>'+
						  '</div>'+
						'</div>';
	return contentString;
  }
  
}
