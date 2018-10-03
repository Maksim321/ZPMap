import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message:any;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.messageService.popMessages(this.message);
    },3000);
  }

  onClick(){
  	this.messageService.popMessages(this.message);
  }
}
