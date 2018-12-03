import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PairedList } from '../../utils/interfaces/pairedList';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { TestingPage } from '../testing/testing';

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

  public pairedDeviceId: number = 0;
  public listToggle: boolean;
  public pairedList: PairedList;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private msg: MessageController) 
    {
      this.checkBluetoothEnabled();
      console.log("Dispositivos disponibles", this.pairedList);
    }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled()
      .then(success => {
        console.log(success)
        this.listPairedDevices()
      })
      .catch(error => {
        console.log(error)
        this.msg.show("Error", "Please enable Bluetooth.")
      });
  }

  listPairedDevices() {
    this.bluetoothSerial.list()
      .then((success) => {
        console.log(JSON.stringify(success))
        this.pairedList = success
        this.listToggle = true
      })
      .catch(error => {
        console.log(error)
        this.msg.show("Error", "Please enable Bluetooth.")
      })
  }

  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceId]; {
      if (!connectedDevice.address) {
        this.msg.show("Error", "Select paired device to connect.")
        return;
      }
      const { address } = connectedDevice;
      this.connect(address, () => {
        this.navCtrl.setRoot(TestingPage);
      })
    }
  }

  connect(address, callback?) {
    this.bluetoothSerial
      .connect(address)
      .subscribe(success => {
        console.log(success)
        this.deviceConnected()
        this.msg.show("", "Successfully connected")
        callback();
      }, error => {
        console.log(error)
        this.msg.show("Error", "An error occured while trying to connect to device")
      })
  }
  
  deviceConnected() {
    this.bluetoothSerial
      .subscribe("\n")
      .subscribe(success => {
        this.msg.show("Data", success)
      }, error => {
        this.msg.show("Error", error)
      })
  }

  deviceDisconnected() {
    this.bluetoothSerial
      .disconnect()
      .then(success => {
        console.log(success)
        this.msg.show("", "Device disconnected.")
      })
      .catch(error => {
        this.msg.show("Error", error)
      })
  }

}