<<<<<<< HEAD
import { BluetoothProvider } from './../../providers/bluetooth/bluetooth';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { MessageController } from '../../utils/messageCtrl';
=======
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

<<<<<<< HEAD

  command: String;
  listToggle: boolean = false;
  pairedDeviceId: number = 0;
  pairedList: PairedList;

  constructor(public navCtrl: NavController, public msg: MessageController, public bluetoothSerial: BluetoothSerial,
              private openNativeSettings: OpenNativeSettings, private bluetoothProvider: BluetoothProvider) {
                this.bluetoothProvider.checkBluetoothEnabled();
                this.command = '';
               }
    
  
                listPairedDevices(){
                  this.bluetoothProvider.listPairedDevices();
                }

                selectDevice(){
                  this.bluetoothProvider.selectDevice();
                }
                /*
                send(){
                   this.bluetoothProvider.send();
                }
                */

  /*              
    this.command = '';
    this.checkBluetoothEnabled();
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
      const { address, name } = connectedDevice;
      this.connect(address)
    }
  }

  connect(address: string) {
    this.bluetoothSerial
      .connect(address)
      .subscribe(success => {
        console.log(success)
        this.deviceConnected()
        this.msg.show("", "Successfully connected")
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
*/
  send() {
    /*
    let data = [{
      "74LS04": {
        pinNo: 4,
        config: "OIOIOIOIOIOIOO"
        //test: [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
        //result: [[1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0]],
        //description: "6 Compuertas Inversoras NOT"
      }
    },
    ];*/
    
    //this.command = JSON.stringify(data[0]["74LS04"]);
    
    this.command += '\n'
    
    this.msg.show("DataToSend", this.command)
    console.log(this.command)
    this.bluetoothSerial
      .write(this.command)
      .then(success => {
        console.log(success)
      }, error => {
        this.msg.show("Error", error)
      })

    this.bluetoothSerial.clear();
  }

  open(setting: string){
      this.openNativeSettings.open(setting).then(val => {
        alert(setting);
      }).catch(err=>{
        alert(JSON.stringify(err))
      })
  }

}

interface PairedList {
  id: string,
  address: string,
  name: string,
  class: number,
}

=======
  constructor(public navCtrl: NavController) {

  }

}
>>>>>>> 939d2bb4e8a94eebfb90543e33ab76e6bddede39
