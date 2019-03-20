import { Injectable } from '@angular/core';

@Injectable()
export class ModalDialogService {
  private isOpenModalForm:boolean = false;

  private isOpenLoginForm:boolean = false;
  private isOpenAddMarkerForm:boolean = false;
  private spinnerStatus: boolean = false;

  get getSpinnerStatus():boolean {
    return this.spinnerStatus;
  }

  get getOpenModalForm():boolean {
    return this.isOpenModalForm;
  }

  get getOpenLoginForm():boolean {
    return this.isOpenLoginForm;
  }

  get getOpenAddMarkerForm():boolean {
    return this.isOpenAddMarkerForm;
  }

  set setSpinnerStatus(status:boolean) {
    this.spinnerStatus = status;
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
    this.setSpinnerStatus = false;
    this.isOpenModalForm = false; 
    this.closeLoginForm();
    this.closeAddMarkerForm();
  }
}
