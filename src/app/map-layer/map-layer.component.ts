import { Component, Inject, ElementRef, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-layer',
  templateUrl: './map-layer.component.html',
  styleUrls: ['./map-layer.component.css']
})
export class MapLayerComponent implements OnInit {
  
  private mapContainer: HTMLElement;

  constructor(private mapService: MapService,
			        @Inject(DOCUMENT) private document: any,
			        private _elemRef: ElementRef) { 
      this.mapContainer = this.document.createElement('div');
      this.mapContainer.className = 'map';
	    this._elemRef.nativeElement.appendChild(this.mapContainer);
	    this.mapService.initMap(this.mapContainer);
  }

  ngOnInit() {
	  this.mapService.initMapClickEvents();
    this.mapService.initMapMouseMoveEvents();
  }
}
