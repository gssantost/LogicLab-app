import { AddPage } from './../add/add';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TableProvider } from '../../providers/table/table';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ResultPage } from '../result/result';

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
      this.userInput = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingPage');
    this.tableService.isEmpty()
      .then(flag => {
        if (!flag) {
          this.tableService.setTable()
            .then((loaded) => {
              if (loaded) {
                console.log('Chip table loaded');
              } else {
                console.log('Chip table not loaded');
              }
            })
        }
      })
  }

  check(id: string) {
    this.uiCtrl.load();

    if (id.trim() == '') {
      this.uiCtrl.dismiss();
      this.uiCtrl.show('', 'Introduzca un serial TTL válido');
    } else {
      this.tableService.getChip(id.trim())
        .then((data) => {
          console.log("IC seleccionado", JSON.stringify(data))

          const { id, result, info, ...rest } = data;
          let obj = {
            ...rest
          };

          let message = JSON.stringify(obj) + '\n';

          this.bluetoothSerial.write(message)
            .then((success) => {
              console.log(success);
              this.uiCtrl.dismiss();
              this.navCtrl.push(ResultPage);
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
  }

  showAllChips() {
    this.tableService.getTable().then(t => {
      console.log(JSON.stringify(t));
    })
  }

  /**
   * Método de prueba para adicionar un chip a la Tabla del NativeStorage
   * 
   */

  addChip(chip){
    this.navCtrl.push(AddPage, {id:chip})
    console.log(chip);
  }

  add() {
    let chip = {
      id: '74LS32',
      pinNo: 14,
      config: 'OOIOOIGIOOIOOV',
      test: [[0, 0], [0, 1], [1, 0], [1, 1]],
      result: [[0, 1, 1, 1]],
      info: 'OR - 4 Compuertas de 2 Entradas'
    }
    this.tableService.addChip(chip).then(done => {
      if (done) {
        console.log('New chip added!');
        this.showAllChips();
      } else {
        console.log('Error al añadir el chip!');
      }
    });
  }

}
