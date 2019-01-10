import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Device } from '../../utils/interfaces/device';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { TestingPage } from '../testing/testing';
import { ReceiverProvider } from '../../providers/receiver/receiver';
import { ResultPage } from '../result/result';

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
  public deviceList: Array<Device> = [];
  public spinning: boolean = true;
  public pageState: string = "SEARCHING";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private receiverService: ReceiverProvider,
    private msg: MessageController) 
    {
      this.checkBluetoothEnabled()
      this.pageState = "SEARCHING";
    }

  checkBluetoothEnabled() {
    return this.bluetoothSerial.isEnabled()
      .then(success => {
        console.log(success)
        this.listAll()
      })
      .catch(error => {
        console.log(error)
        this.pageState = "NOBLUETOOTH";
      });
  }

  listAll() {
    this.deviceList = [];
    this.pageState = "SEARCHING";
    Promise.all([this.bluetoothSerial.discoverUnpaired(), this.bluetoothSerial.list()])
      .then(data => {
        console.log(JSON.stringify(data))
        data.forEach((devices) => {
          console.log("Devices", JSON.stringify(devices))
          if (devices.length !== 0) {
            devices.forEach((device: Device) => {
              this.deviceList.push(device);
            })
          }
        })
        console.log(JSON.stringify(this.deviceList))
        this.listToggle = true
        this.pageState = "DONE"
      }
    ).catch(error => {
      console.log(error)
      this.msg.show("Error", "Please enable Bluetooth.")
    })      
  }

  selectDevice() {
    let connectedDevice = this.deviceList[this.pairedDeviceId]; 
    if (!connectedDevice.address) {
      this.msg.show("Error", "Select a device to connect.") 
    } else {
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
        this.suscribeBluetoothEvent()
        this.msg.show("", "Successfully connected")
        callback();
      }, error => {
        console.log(error)
        this.pageState = "NOBLUETOOTH"
        this.msg.show("Error", "An error occured while trying to connect to device")
      })
  }
  
  suscribeBluetoothEvent() {
    this.bluetoothSerial
      .subscribe("\n")
      .subscribe(success => {
        this.receiverService.setIncomingData(success)
        this.msg.dismiss()
        this.navCtrl.push(ResultPage)
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

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    this.checkBluetoothEnabled()
      .then(() => {
        refresher.complete()
      })
  }

}