import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ApiService } from "../services/api.service";
import { MessageService } from '../services/message.service';
import { MapService } from '../services/map.service';
import { ModalDialogService } from '../services/modal-dialog.service';

import { Subcategories } from '../subcategories';
import { Categories } from '../categories';

@Component({
  selector: 'add-marker-form',
  templateUrl: './add-marker-form.component.html',
  styleUrls: ['./add-marker-form.component.css']
})
export class AddMarkerFormComponent implements OnInit {

  lon:number;
  lat:number;
  address:string;  
  file: any;
  arrayCategories: Categories[];
  arraySubcategories: Subcategories[];
  selectedCategoriesID:string;

  constructor(public modalDialogService: ModalDialogService,
              private authService: AuthService,
              private apiService: ApiService,
              private messageService: MessageService,
              public mapService: MapService) { }

  ngOnInit() {
    this.apiService.getCategoriesCollection().subscribe(arrayCategories => this.arrayCategories = arrayCategories);
  }

  onChange(changedValue){
    this.selectedCategoriesID = changedValue;
    this.apiService.getSubcategoriesCollection(changedValue)
      .subscribe(arraySubcategories => this.arraySubcategories = arraySubcategories);  
  }

  savePhoto(event) {
    this.file = event.item(0);
  }

  onSubmit(dataForm: NgForm){
    if(this.isEmptyForm(dataForm)){
      this.modalDialogService.showSpinner = true;
      if(this.file){
        this.loadImagePoint(dataForm);
      }
      else{
        this.loadPointForm(dataForm);
      }
    }
  }

  loadImagePoint(dataForm: NgForm){
    if (this.file.type.split('/')[0] !== 'image') { 
      this.messageService.errorMessages("Error:","Неподдерживаемый тип файла!");
      this.modalDialogService.showSpinner = false;
      return;
    }

    const pathImage = `img/${new Date().getTime()}_${this.file.name}`;
    const metadata = { Test: 'Test' };

    this.apiService.uploadImage(pathImage, this.file, metadata).then(res =>{
      dataForm.value['Image'] = pathImage;
      this.loadPointForm(dataForm);
    }, err=>{
      this.modalDialogService.showSpinner = false;
      this.messageService.errorMessages("Error:","Ошибка при загрузке изображения - ["+err.message+"]");
    });
  }

  loadPointForm(dataForm: NgForm){
    dataForm.value['NameCreator'] = this.authService.authState.displayName;
    dataForm.value['Address'] = this.mapService.getcurrentMarker.Address;
    dataForm.value['Lat'] = this.mapService.getcurrentMarker.Lat;
    dataForm.value['Lon'] = this.mapService.getcurrentMarker.Lon;
    dataForm.value['Date'] = new Date();
    this.apiService.addMarker(dataForm.value).then(res => {
      this.messageService.successMessages("Ура!:","Метка успешно добавлена!");
      this.modalDialogService.showSpinner = false;
      this.modalDialogService.closeModalForm();
    }, err=>{
      this.modalDialogService.showSpinner = false;
      this.messageService.errorMessages("Error:","Ошибка при загрузке информации о метке - ["+err.message+"]");
    });
  }
  
  isEmptyForm(dataForm: NgForm){
    if(dataForm.value['TitlePoint']!==""&&dataForm.value['DescriptionPoint']!==""&&
       dataForm.value['ID_Categories']!==""&&dataForm.value['ID_Subcategories']!==""){
      return true;
    }
    else{
      this.messageService.warningMessages("Алё:","Заполните все поля!");
      this.modalDialogService.showSpinner = false;
      return false;
    }
  }
}
