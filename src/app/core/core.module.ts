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
  ObservablesService
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
    ObservablesService
  ],
  declarations: []
})
export class CoreModule { }
