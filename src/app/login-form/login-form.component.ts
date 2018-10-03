import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, MessageService, ModalDialogService } from "../core";

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
    this.modalDialogService.setSpinnerStatus = true;
    this.authService.doGoogleLogin().then(res => {
      this.messageService.successMessages("Ура!", "Успешно авторизировались!"); 
      this.modalDialogService.closeModalForm(); 
    });
  }

  tryLogin(value){
    this.modalDialogService.setSpinnerStatus = true;
    if(!this.isRegister){
        this.authService.doLogin(value).then(res => {
        this.messageService.successMessages("Ура!", "Успешно авторизировались!");  
        this.modalDialogService.closeModalForm(); 
      }, err => {
        this.modalDialogService.setSpinnerStatus = false;
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
        this.modalDialogService.closeModalForm(); 
      }, err => {
        this.messageService.errorMessages("Error", err.message);
        this.modalDialogService.setSpinnerStatus = false;
      });
    }
    else{
      this.modalDialogService.setSpinnerStatus = false; 
      this.messageService.errorMessages("Error", "Введите имя!");
    }
  }
}
