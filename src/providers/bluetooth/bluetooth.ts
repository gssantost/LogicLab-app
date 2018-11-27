
import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { MessageController } from '../../utils/messageCtrl';
@Injectable()
export class BluetoothProvider {

  command: String;
  listToggle: boolean = false;
  pairedDeviceId: number = 0;
  pairedList: PairedList;

  constructor( public bluetoothSerial: BluetoothSerial,  public msg: MessageController) {
    //this.command = '';
   //this.checkBluetoothEnabled();
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
}

interface PairedList {
  id: string,
  address: string,
  name: string,
  class: number,
}