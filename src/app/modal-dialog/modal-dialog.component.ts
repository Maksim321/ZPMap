import { Component, OnInit, Input, Output} from '@angular/core';
import { ModalDialogService } from "../core";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  constructor(public modalDialogService: ModalDialogService) { }

  ngOnInit() {}
}
