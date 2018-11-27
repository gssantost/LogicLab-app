<<<<<<< HEAD
import { SplashPage } from './../pages/splash/splash';
=======
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
<<<<<<< HEAD
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessageController } from '../utils/messageCtrl';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { BluetoothProvider } from '../providers/bluetooth/bluetooth';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage
=======

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    HomePage,
    SplashPage
=======
    HomePage
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    BluetoothSerial,
    MessageController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OpenNativeSettings,
    BluetoothProvider
  ]
  
=======
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
})
export class AppModule {}
