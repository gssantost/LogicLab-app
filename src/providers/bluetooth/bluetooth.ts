
import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { PairedList } from '../../utils/interfaces/pairedList';
import { Chip } from '../../utils/interfaces/chip';

@Injectable()
export class BluetoothProvider {

  command: String;
  //listToggle: boolean = false;
  pairedDeviceId: number = 0;
  pairedList: PairedList;

  constructor( public bluetoothSerial: BluetoothSerial,  public msg: MessageController) {
    //this.command = '';
    //this.checkBluetoothEnabled();
  }

  async checkBluetoothEnabled() {
    try {
      let success = this.bluetoothSerial.isEnabled();
      if (success) {
        try {
          this.pairedList = await this.bluetoothSerial.list();
        } catch (e) {
          console.log(e);
          this.msg.show("Error", "Please enable Bluetooth.")
        }
      }
    } catch (e) {
      console.log(e);
      this.msg.show("Error", "Please enable Bluetooth.")
    }

    /*this.bluetoothSerial.isEnabled()
      .then(success => {
        console.log(success)
        try {
          this.pairedList = await this.listPairedDevices();
        } catch (e) {

        }
      })
      .catch(error => {
        console.log(error)
        this.msg.show("Error", "Please enable Bluetooth.")
      });*/
  }
  
  async listPairedDevices() {
    return await this.bluetoothSerial.list();
      /*.then((success) => {
        console.log(JSON.stringify(success))
        this.pairedList = success
        // this.listToggle = true
      })
      .catch(error => {
        console.log(error)
        this.msg.show("Error", "Please enable Bluetooth.")
      })*/
  }

  getPairedDevices(): PairedList {
    return this.pairedList;
  }
  
  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceId]; {
      if (!connectedDevice.address) {
        this.msg.show("Error", "Select paired device to connect.")
        return;
      }
      const { address } = connectedDevice;
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
  
  /*send() {
    
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
  }*/

  send(data: Chip): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, result, info, ...rest } = data;
        let message = {
          ...rest
        };

        let response = await this.bluetoothSerial.write(JSON.stringify(message) + '\n');

        resolve(response);
        
      } catch (e) {
        reject(e);
      }
    });
  }

}