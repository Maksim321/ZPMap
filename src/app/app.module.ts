import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MapLayerComponent } from './map-layer/map-layer.component';
import { ApiService } from './services/api.service';
import { MapService } from './services/map.service';
import { EditModeInfoService } from './services/edit-mode-info.service';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ModalDialogService } from './services/modal-dialog.service';
import { MessageService } from './services/message.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CardPointComponent } from './card-point/card-point.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AddMarkerFormComponent } from './add-marker-form/add-marker-form.component';
import { AlertComponent } from './alert/alert.component';
import { EditModeInfoComponent } from './edit-mode-info/edit-mode-info.component';



@NgModule({
  declarations: [
    AppComponent,
    MapLayerComponent,
    LeftMenuComponent,
    ModalDialogComponent,
    CardPointComponent,
    HeaderComponent,
    LoginFormComponent,
    LoadingSpinnerComponent,
    AddMarkerFormComponent,
    AlertComponent,
    EditModeInfoComponent
  ],
  imports: [
  BrowserModule,
	FormsModule,
	AngularFireModule.initializeApp(environment.firebase),
	AngularFireStorageModule,
  AngularFirestoreModule,
	AngularFireAuthModule
  ],
  providers: [ApiService, MapService, ModalDialogService, MessageService, EditModeInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
