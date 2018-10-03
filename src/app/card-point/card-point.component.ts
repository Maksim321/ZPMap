import { Component, OnInit, Input } from '@angular/core';
import { ApiService, MapService, Marker } from "../core";

import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-card-point',
  templateUrl: './card-point.component.html',
  styleUrls: ['./card-point.component.css']
})

export class CardPointComponent implements OnInit {
  @Input() marker:Marker;
  time:string;
  date:string;
  urlImage: Observable<string | null>;


  constructor(private apiService: ApiService,
              public mapService: MapService) {}
  
  ngOnInit() {
    if(this.marker.Image)
      this.urlImage = this.apiService.convertImage(this.marker.Image);
    
    if(this.marker.Date){
    this.date = (( this.marker.Date.toDate().getDate() < 10)?"0":"") +  this.marker.Date.toDate().getDate() + "-"
              + (((this.marker.Date.toDate().getMonth()+1) < 10)?"0":"") + (this.marker.Date.toDate().getMonth()+1)+ "-" 
              + this.marker.Date.toDate().getFullYear();

    this.time = this.marker.Date.toDate().getHours() + ":"  
              + this.marker.Date.toDate().getMinutes() + ":" 
              + this.marker.Date.toDate().getSeconds();
    }
  }
}
