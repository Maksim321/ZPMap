import { Component, OnInit, Input} from '@angular/core';
import { SubscribingToDataService } from "../services/subscribing-to-data.service";
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  providers: [MenuService]
})

export class LeftMenuComponent implements OnInit {

  constructor(private subscribingToDataService: SubscribingToDataService,
  			  public menuService: MenuService) {}

  ngOnInit() {}
}
