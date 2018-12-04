import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TableProvider } from '../../providers/table/table';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { BluetoothProvider } from '../../providers/bluetooth/bluetooth';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the TestingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
})
export class TestingPage {

  public userInput: string;

  constructor(
    public navCtrl: NavController, 
    public uiCtrl: MessageController,
    public navParams: NavParams,
    private tableService: TableProvider, 
    private bluetoothSerial: BluetoothSerial) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingPage');
  }

  send() {
    
  }

  check(id: string) {
    this.uiCtrl.load();

    this.tableService.getChip(id.trim())
      .then((data) => {
        console.log("IC seleccionado", JSON.stringify(data))

        const { id, result, info, ...rest } = data;
        let message = {
          ...rest
        };
        
        this.bluetoothSerial.write(JSON.stringify(message) + '\n')
        .then((success) => {
              console.log(success); 
              this.uiCtrl.dismiss();
        }).catch((failure) => {
          console.log(failure)
          this.uiCtrl.show("Error", failure);
          this.uiCtrl.dismiss();
        });
      }).catch((e) => {
        console.log(e)
        this.uiCtrl.show("Error", "IC not found.")
        this.uiCtrl.dismiss();
      });
    }

  suscribeData() {
    this.bluetoothSerial.subscribe('\n');
  }
}
