import { ConnectPage } from './../pages/connect/connect';
import { SplashPage } from './../pages/splash/splash';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessageController } from '../utils/messageCtrl/messageCtrl';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { BluetoothProvider } from '../providers/bluetooth/bluetooth';
import { TestingPage } from '../pages/testing/testing';
import { TableProvider } from '../providers/table/table';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage,
    ConnectPage,
    TestingPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    ConnectPage, 
    TestingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    MessageController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OpenNativeSettings,
    BluetoothProvider,
    TableProvider
  ]
  
})
export class AppModule {}
