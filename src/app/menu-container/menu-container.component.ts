import { Component, OnInit } from '@angular/core';
import { ObservablesService, MenuService }  from "../core";

import * as $ from 'jquery';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})
export class MenuContainerComponent implements OnInit {

  constructor(private observables: ObservablesService,
              public menuService: MenuService) {}

  ngOnInit() {
    window.addEventListener('resize', ()=> {
      if(!this.menuService.getMenuStatus){
        $(".left-menu").css( "margin-left" , -$(".left-menu").width()+ 
          $(".menu-container .menu-categories").width());
      }
    }, false);   
  }
}
