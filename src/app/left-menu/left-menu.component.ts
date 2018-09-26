import { Component, OnInit, Input} from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})

export class LeftMenuComponent implements OnInit {

  constructor(private menuService: MenuService) {}

  ngOnInit() {}
}
