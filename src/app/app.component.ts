import { Component, OnInit } from '@angular/core';
import { AuthService, EditModeInfoService, MapService, 
  MessageService, ModalDialogService, ObservablesService, ApiService} from './core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  defaultCategory:Subscription;
  constructor(public messageService: MessageService,
  			      public modalDialogService: ModalDialogService,
              public editModeInfoService: EditModeInfoService,
              public authService: AuthService,
              public observables: ObservablesService,
              private mapService: MapService){

    this.authService.getAuthState$.subscribe((auth) => {
      if(auth)
        this.authService.setAuthState = auth;
    });
    
    this.observables.loadingCategories();
  }
  
  ngOnInit() {
    this.defaultCategory = this.observables.getCategories$.subscribe(categories=>{
      this.observables.loadingSubcategories(categories[0].uidCategory);
      this.observables.loadingMarkers("uidCategory", categories[0].uidCategory);
    });
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






