import { Component, OnInit, Input } from '@angular/core';
import { ObservablesService, MenuService } from "../../core";

import * as $ from 'jquery';

@Component({
  selector: 'app-categories-container',
  templateUrl: './categories-container.component.html',
  styleUrls: ['./categories-container.component.css']
})

export class CategoriesContainerComponent implements OnInit {
  constructor(private observables: ObservablesService,
              public menuService: MenuService) {}
  
  ngOnInit() {
  }

  openOrCloseMenu(uidCategory){
    if(this.menuService.getMenuStatus && this.menuService.getSelectedCategoriesUID === uidCategory){
      $(".left-menu").animate({marginLeft:0 - $(".left-menu").width() + $(".menu-container .menu-categories").width()},300);
      this.menuService.setMenuStatus = false;
    }
    else{
      $(".left-menu").animate({marginLeft:0},300);
      this.menuService.openMenu(uidCategory);
    }
  }
}
