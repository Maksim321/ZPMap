import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { ModalDialogService } from '../services/modal-dialog.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isRegister:boolean = false;
  constructor(public modalDialogService: ModalDialogService,
              private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  selectRegister(){
    this.isRegister = !this.isRegister;
  }

  tryGoogleLogin(){
    this.modalDialogService.showSpinner = true;
    this.authService.doGoogleLogin().then(res => {
      this.messageService.successMessages("Ура!", "Успешно авторизировались!"); 
      this.success();
    });
  }

  tryLogin(value){
    this.modalDialogService.showSpinner = true;
    if(!this.isRegister){
        this.authService.doLogin(value).then(res => {
        this.messageService.successMessages("Ура!", "Успешно авторизировались!");  
        this.success();
      }, err => {
        this.modalDialogService.showSpinner = false;
        this.messageService.errorMessages("Error", err.message);
      });
    }
    else{
      this.tryRegister(value);
    }
  }

  tryRegister(value){
    if(value.displayName){
      this.authService.doRegister(value).then(res => {
        this.messageService.successMessages("Ура!", "Регистрация прошла успешно!");
        this.success();
      }, err => {
        this.messageService.errorMessages("Error", err.message);
        this.modalDialogService.showSpinner = false;
      });
    }
    else{
      this.modalDialogService.showSpinner = false; 
      this.messageService.errorMessages("Error", "Введите имя!");
    }
  }

  success(){
    this.modalDialogService.showSpinner = false;
    this.modalDialogService.closeModalForm();    
  }

}
