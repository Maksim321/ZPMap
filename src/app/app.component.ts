import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { EditModeInfoService } from './services/edit-mode-info.service';
import { ModalDialogService } from './services/modal-dialog.service';
import { AuthService } from './services/auth.service';
import { MapService } from './services/map.service';

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

  onClick(message){
  	this.messageService.popMessages(message);
  }

  ngOnInit() {
  }
  
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






