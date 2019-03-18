import { Component, OnInit, Input } from '@angular/core';
import { ObservablesService, MenuService } from "../../core";

import * as $ from 'jquery';

@Component({
  selector: 'app-subcategories-container',
  templateUrl: './subcategories-container.component.html',
  styleUrls: ['./subcategories-container.component.css']
})

export class SubcategoriesContainerComponent implements OnInit {

  constructor(private observables: ObservablesService,
              public menuService: MenuService) {}
  
  ngOnInit() {}
}
