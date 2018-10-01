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
  
  setInfoWindowMap(marker, contentString){
  	google.maps.event.addListener(marker, 'click', ((marker)=>{
        return ()=>{
          let infowindow = new google.maps.InfoWindow({content: contentString});
          infowindow.open(this.map, marker);
        }
    })(marker));
  }
 
 
  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }
	  
  deleteMarkers() {
    //this.clearMarkers();
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  
  teleportToMarker(marker:Point){
    this.getMap.panTo(new google.maps.LatLng(marker.Lat, marker.Lon));
    this.getMap.setZoom(17);
  }
  
  placeArrayMarkers(arrayMarkets:Marker[], categories:Categories[],subcategories:Subcategories[]) {
    this.deleteMarkers();
    arrayMarkets.forEach(marker=>{
      if(marker.Image){
        this.apiService.convertImage(marker.Image).subscribe(value=>{
          this.setInfoWindowMap(this.setMarker({Address:"", Lat:marker.Lat, Lon:marker.Lon}), 
            this.createHtmlContent(marker,categories,subcategories, value));
        });
      }  
      else{
        this.setInfoWindowMap(this.setMarker({Address:"", Lat:marker.Lat, Lon:marker.Lon}), 
          this.createHtmlContent(marker,categories,subcategories, "assets/img/no_photo.jpg"));
      }
    });
  }

  private createHtmlContent(marker, categories,subcategories, image){
	let contentString = '<div class="infowindow">'+
						  '<div class="infowindow-wrapper">'+
						    '<div class="photos">'+
						      '<img src="'+image+'">'+
						    '</div>'+
  						  '<h3>'+marker.Title+'</h3>'+
  						  '<ul>';
  						    for(let category of categories){
  							    if(marker.uidCategory===category.uidCategory)
  								    contentString+='<li><b>Категория:</b> '+category.NameCategories+'</li>';
  						    }
  						    for(let subcategory of subcategories){
  							    if(marker.uidSubcategory===subcategory.uidSubcategory)
  								    contentString+='<li><b>Подкатегория:</b> '+subcategory.NameSubcategories+'</li>';
  						    }
  							  contentString+='<li><b>Адрес:</b> '+marker.Address+'</li>'+
  							  '<li><b>Добавил:</b> '+marker.NameCreator+'</li>'+
  							  '<li><b>Описание:</b></br> '+marker.Description+'</li>'+
  						  '</ul>'+
						  '</div>'+
						'</div>';
	return contentString;
  }
  
}
