import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  ApiService,
  AuthService,
  EditModeInfoService,
  MapService,
  MenuService,
  MessageService,
  ModalDialogService,
  SubscribingToDataService
} from './services';


@NgModule({
  imports: [
  BrowserModule,
  ],
  providers: [
    ApiService,
    AuthService,
    EditModeInfoService,
    MapService,
    MenuService,
    MessageService,
    ModalDialogService,
    SubscribingToDataService
  ],
  declarations: []
})
export class CoreModule { }
