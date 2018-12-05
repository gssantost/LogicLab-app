import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TableProvider } from '../../providers/table/table';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';

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
  private observable: Observable<any>;
  private suscription: ISubscription;

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


  check(id: string) {
    this.uiCtrl.load();

    this.tableService.getChip(id.trim())
      .then((data) => {
        console.log("IC seleccionado", JSON.stringify(data))

        const { id, result, info, ...rest } = data;
        let obj = {
          ...rest
        };

        let message = JSON.stringify(obj) + '\n';

        /*this.suscription = this.createSocket(message)
          .suscribe((data) => {
            console.log(data);
            this.uiCtrl.dismiss();
          }
        );*/  
        
        this.bluetoothSerial.write(message)
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

  /*createSocket(message: string) {
    return Observable.create((observer) => {
      this.bluetoothSerial.isConnected()
        .then((success) => {

          console.log('Connected!', success);

          this.observable = Observable.from(this.bluetoothSerial.write(message))
            .flatMap(() => this.bluetoothSerial.subscribeRawData())
            .flatMap(() => this.bluetoothSerial.readUntil('\n'));

            this.observable.subscribe(data => {
              observer.next(data);
            });

        }, (failure) => {

          console.log('Not connected', failure);
          observer.next('Not connected');
          observer.complete();
        
        })
    });
  }*/

}
