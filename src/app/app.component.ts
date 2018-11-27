<<<<<<< HEAD
import { SplashPage } from './../pages/splash/splash';
=======
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
<<<<<<< HEAD
import { ModalController } from 'ionic-angular';
=======

>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
  rootPage:any = SplashPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {
=======
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
<<<<<<< HEAD

=======
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
    });
  }
}

