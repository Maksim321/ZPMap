import { Injectable, NgZone } from '@angular/core';
import { ApiService } from "./api.service";
import { Point } from '../point';

@Injectable()
export class MapService {
  
  private map: any;
  private marker: any;
  private markers: Array<any> = [];
  private geocoder: any;
  private currentMarker: Point;
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
  	google.maps.event.addListener(this.map, 'click', (event)=> {
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
  
  setMarker(lat, lon){  
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: this.map
    });
  	this.markers.push(marker);
  	return marker;
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  setInfoWindowMap(marker, contentString){
  	let infowindow = new google.maps.InfoWindow();
  	google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow = new google.maps.InfoWindow({
            content: contentString
  		  });
          infowindow.open(this.map, marker);
        }
    })(marker));
  }
 
 
  clearMarkers() {
    this.setMapOnAll(null);
  }
	  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
  
  teleportToMarker(marker:Point){
    this.getMap.panTo(new google.maps.LatLng(marker.Lat, marker.Lon));
    this.getMap.setZoom(17);
  }
  
  placeArrayMarkers(arrayMarkets, categories,subcategories) {
    this.deleteMarkers();
    arrayMarkets.forEach(marker=>{
      if(marker.Image){
        this.apiService.convertImage(marker.Image).subscribe(value=>{
          this.setInfoWindowMap(this.setMarker(marker.Lat, marker.Lon), 
            this.createHtmlContent(marker,categories,subcategories, value));
        });
      }  
      else{
        this.setInfoWindowMap(this.setMarker(marker.Lat, marker.Lon), 
          this.createHtmlContent(marker,categories,subcategories, "assets/img/no_photo.jpg"));
      }
    });
  }

  createHtmlContent(marker, categories,subcategories, image){
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
