import { Component, OnInit } from '@angular/core';
import { EditModeInfoService } from '../services/edit-mode-info.service';

@Component({
  selector: 'app-edit-mode-info',
  templateUrl: './edit-mode-info.component.html',
  styleUrls: ['./edit-mode-info.component.css']
})
export class EditModeInfoComponent implements OnInit {

  constructor(public editModeInfoService: EditModeInfoService) { }

  ngOnInit() {}

}
