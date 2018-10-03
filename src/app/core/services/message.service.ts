import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models';


@Injectable()
export class MessageService {

  messages:Message[] = [];
  constructor() { }

  get getMessage(): Message[]{
    return this.messages;
  }

  private pushMessages(strong, text, className){
    this.messages.push({strong: strong, text: text, className: className});
  }

  popMessages(message){
  	this.messages.splice(this.messages.indexOf(message), 1);
  }

  successMessages(strong, text){
  	this.pushMessages(strong, text, "success");
  }

  warningMessages(strong, text){
    this.pushMessages(strong, text, "warning");
  }

  infoMessages(strong, text){
    this.pushMessages(strong, text, "info");
  }

  errorMessages(strong, text){
    this.pushMessages(strong, text, "");
  }

  clear() {
    this.messages = [];
  }  
}
