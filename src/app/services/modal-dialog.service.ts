import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class ModalDialogService {
  private isOpenModalForm:boolean = false;

  private isOpenLoginForm:boolean = false;
  private isOpenAddMarkerForm:boolean = false;
  showSpinner: boolean = false;

  get getOpenModalForm():boolean {
    return this.isOpenModalForm;
  }

  get getOpenLoginForm():boolean {
    return this.isOpenLoginForm;
  }

  get getOpenAddMarkerForm():boolean {
    return this.isOpenAddMarkerForm;
  }

  openModalForm() { 
    this.isOpenModalForm = true; 
  }
  openLoginForm() { 
    this.openModalForm();
    this.isOpenLoginForm = true; 
  }

  openAddMarkerForm() {
    this.openModalForm(); 
    this.isOpenAddMarkerForm = true; 
  }

  closeLoginForm() { this.isOpenLoginForm = false; }
  closeAddMarkerForm() { this.isOpenAddMarkerForm = false; }
  closeModalForm() {
    $('.modal_form').animate({opacity: 0, top: '30%'}, 300, ()=>{ 
      $('#overlay').fadeOut(300,()=>{
        this.showSpinner = false;
        this.isOpenModalForm = false; 
        this.closeLoginForm();
        this.closeAddMarkerForm(); 
      });
    });
  }
}
