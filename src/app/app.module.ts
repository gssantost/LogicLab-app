import { ResultPage } from './../pages/result/result';
import { AddPage } from './../pages/add/add';


import { ConnectPage } from './../pages/connect/connect';
import { SplashPage } from './../pages/splash/splash';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicApp} from 'ionic-angular';
import {  IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { MessageController } from '../utils/messageCtrl/messageCtrl';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { TestingPage } from '../pages/testing/testing';
import { TableProvider } from '../providers/table/table';
import { ReceiverProvider } from '../providers/receiver/receiver';


@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    ConnectPage,
    TestingPage,
    AddPage,
    ResultPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    ConnectPage, 
    TestingPage,
    AddPage,
    ResultPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    MessageController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OpenNativeSettings,
    TableProvider,
    NativeStorage,
    ReceiverProvider,
  ]
  
})
export class AppModule {}
