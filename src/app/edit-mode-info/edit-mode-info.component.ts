import { Component, OnInit } from '@angular/core';
import { EditModeInfoService } from '../services/edit-mode-info.service';
import { MapService } from '../services/map.service';
import { MenuService } from '../services/menu.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-edit-mode-info',
  templateUrl: './edit-mode-info.component.html',
  styleUrls: ['./edit-mode-info.component.css']
})
export class EditModeInfoComponent implements OnInit {

  constructor(public editModeInfoService: EditModeInfoService,
  			      private mapService: MapService,
  			      private menuService: MenuService) { }

  ngOnInit() {
  	this.menuService.hideMenu().then(()=>{
      $('.add-marker-info').animate({opacity: 0.9}, 200);
    });

    $('.map').mousemove((e)=>{
      $(".current-point-info").css( "top" , (e.clientY + -90) + 'px');
      $(".current-point-info").css( "left" , (e.clientX + -20) + 'px');
    });
  }

  cancelEditMode(){
  	$('.add-marker-info').animate({opacity: 0}, 200,()=>{
      this.editModeInfoService.cancelEditMode();
  	  this.menuService.showMenu();
  	});
  }  

}
