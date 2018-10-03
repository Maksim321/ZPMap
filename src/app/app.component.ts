import { Component, OnInit } from '@angular/core';
import { AuthService, EditModeInfoService, MapService, 
  MessageService, ModalDialogService} from './core';

import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  constructor(public messageService: MessageService,
  			      public modalDialogService: ModalDialogService,
              public editModeInfoService: EditModeInfoService,
              public authService: AuthService,
              private mapService: MapService,){}
  
  ngOnInit() {}
  
  clickOnMap(){
  	if(this.editModeInfoService.getEditModeState){
  	  this.modalDialogService.openAddMarkerForm();
  	}	
  }


  runEditMode(){
    this.mapService.deleteMarkers();
    this.editModeInfoService.openEditMode();
  }
}






