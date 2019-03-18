import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { ModalDialogService } from './modal-dialog.service';
import { AuthService } from './auth.service';
import * as $ from 'jquery';

@Injectable()
export class EditModeInfoService {

  private isEditMode:boolean = false;

  constructor(public messageService: MessageService,
  			      public modalDialogService: ModalDialogService,
              private authService: AuthService) { }

  get getEditModeState(): boolean {
    return this.isEditMode;
  }

  openEditMode(){
    if(this.authService.authenticated){
      this.isEditMode = true;
    }
    else{
      this.messageService.warningMessages("Warning:", "Войдите или зарегистрируйтесь!")
      this.modalDialogService.openLoginForm();
    }
  }

  cancelEditMode(){
    this.isEditMode = false;
  }
}
