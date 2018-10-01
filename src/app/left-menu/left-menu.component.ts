import { Component, OnInit, Input} from '@angular/core';
import { SubscribingToDataService } from "../services/subscribing-to-data.service";
import { MenuService } from '../services/menu.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})

export class LeftMenuComponent implements OnInit {

  constructor(private subscribingToDataService: SubscribingToDataService,
  			  public menuService: MenuService) {}

  ngOnInit() {
	window.addEventListener('resize', ()=> {
      if(!this.menuService.getMenuStatus){
  		  $(".left-menu").css( "margin-left" , -$(".left-menu").width()+ $(".tabs nav").width());
  	  }
  	}, false); 	
  }

  openOrCloseMenu(uidCategory){
  	if(this.menuService.getMenuStatus && this.menuService.getSelectedCategoriesUID === uidCategory){
  	  $(".left-menu").animate({marginLeft:0 - $(".left-menu").width() + $(".tabs nav").width()},300);
  	  this.menuService.closeMenu();
  	}
  	else{
  	  $(".left-menu").animate({marginLeft:0},300);
  	  this.menuService.openMenu(uidCategory);
  	}
  }
}
