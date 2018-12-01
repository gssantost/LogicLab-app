import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothProvider } from './../../providers/bluetooth/bluetooth';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { MessageController } from '../../utils/messageCtrl';

/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private bluetoothProvider: BluetoothProvider) {
    this.bluetoothProvider.checkBluetoothEnabled()
     {


}
  }}