import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalDialogService } from '../services/modal-dialog.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private modalDialogService: ModalDialogService) {}

  ngOnInit() { 
  }

  LogIn(){
    this.modalDialogService.openLoginForm();
  }

  LogOut(){
    window.location.reload();
	  this.authService.logout();  
  }
}
