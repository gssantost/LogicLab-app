import { ConnectPage } from './../connect/connect';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { TableProvider } from '../../providers/table/table';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen, public navCtrl: NavController) {
    
  }
 
  home() {
    this.navCtrl.setRoot(ConnectPage)
  }
}
