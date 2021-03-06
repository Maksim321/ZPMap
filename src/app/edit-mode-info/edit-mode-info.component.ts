import { Component, OnInit } from '@angular/core';
import { EditModeInfoService, MapService, MenuService } from "../core";

import * as $ from 'jquery';

@Component({
  selector: 'app-edit-mode-info',
  templateUrl: './edit-mode-info.component.html',
  styleUrls: ['./edit-mode-info.component.css']
})
export class EditModeInfoComponent implements OnInit {

  constructor(public editModeInfoService: EditModeInfoService,
  			      public mapService: MapService,
  			      private menuService: MenuService) { }

  ngOnInit() {
  	this.menuService.hideMenu();

    $('.map').mousemove((e)=>{
      $(".current-point-info").css( "top" , (e.clientY + -90) + 'px');
      $(".current-point-info").css( "left" , (e.clientX + -20) + 'px');
    });
  }

  cancelEditMode(){
    this.editModeInfoService.cancelEditMode();
  	this.menuService.showMenu();
  }  

}
