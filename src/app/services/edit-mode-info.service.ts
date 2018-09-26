import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { ModalDialogService } from './modal-dialog.service';
import { AuthService } from './auth.service';
import { MenuService } from '../services/menu.service';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class EditModeInfoService {

  isEditMode:boolean = false;

  constructor(public messageService: MessageService,
  			      public modalDialogService: ModalDialogService,
              private authService: AuthService,
              private menuService: MenuService) { }

  get getEditModeState(): boolean {
    return this.isEditMode;
  }

  openEditMode(){
  	if(this.authService.loggedIn){
  	  this.isEditMode = true;
      this.menuService.setMenuStatus = false;
  	  $('.left-menu').animate({marginLeft: - $(".left-menu").width()},200, ()=>{
  	  	$('.add-point-info').animate({opacity: 0.9}, 200);
  	  });
  	  $('.map').css('cursor', 'crosshair');
  	}
  	else{
  	  this.messageService.warningMessages("Warning:", "Войдите или зарегистрируйтесь!")
  	  this.modalDialogService.openLoginForm();
	  }
  }

  cancelEditMode(){
  	$('.add-point-info').animate({opacity: 0}, 200,()=>{
  	  $('.left-menu').animate({marginLeft:0 - $(".left-menu").width() + $(".tabs nav").width()}, 200);
  	  this.isEditMode = false;
  	});
  	$('.map').css('cursor', 'default');
  }  
}
