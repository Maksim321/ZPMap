import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, MessageService, ModalDialogService } from "../core";
import { User } from "../core";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userForm:User = {displayName:'',
                   email:'',
                   password:''}
  isRegister:boolean = false;
  constructor(public modalDialogService: ModalDialogService,
              private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  selectRegister(){
    this.isRegister = !this.isRegister;
  }

  private loginFailed(err){
    this.messageService.errorMessages("Error: ", err.message);
    this.modalDialogService.setSpinnerStatus = false;    
  }

  private loginSuccess(){
    this.messageService.successMessages("Ура!", "Успешно авторизировались!"); 
    this.modalDialogService.closeModalForm();    
  }  

  tryGoogleLogin(){
    this.modalDialogService.setSpinnerStatus = true;
    this.authService.doGoogleLogin().then(res => {
      this.loginSuccess();
    }, err => {
      this.loginFailed(err);
    });
  }

  tryLogin(value){
    this.modalDialogService.setSpinnerStatus = true;
    if(!this.isRegister){
        this.authService.doLogin(value).then(res => {
        this.loginSuccess(); 
      }, err => {
        this.loginFailed(err);
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
