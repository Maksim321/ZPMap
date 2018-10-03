import { Component, OnInit, Input, Output} from '@angular/core';
import { ModalDialogService } from "../core";
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  constructor(public modalDialogService: ModalDialogService) { }

  ngOnInit() {
    $('#overlay').fadeIn(300,()=>{ 
      $('.modal_form') .animate({opacity: 1, top: '50%'}, 300);
    });	
  }
}
