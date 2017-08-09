import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/map';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// COMPONENTS
import { MyApp } from './app.component';

// PAGES
import { HomePage } from '../pages/home/home';
import { ContactPage } from "../pages/contact/contact";
import { AddPage } from "../pages/add/add";

//PIPES
import { NonPrivateKeysPipe } from "./pipes/nonprivatekey.pipe";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    AddPage,
    NonPrivateKeysPipe
  ],  
  imports: [
    BrowserModule,    
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
