import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TableProvider } from '../../providers/table/table';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AddPage } from '../add/add';

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
  public addPage = AddPage;

  constructor(
    public navCtrl: NavController, 
    public messageCtrl: MessageController,
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
      this.messageCtrl.load();
      
      if (id.trim() == '') {
        this.messageCtrl.dismiss();
        this.messageCtrl.toast('Introduce IC number');
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
          }).catch((failure) => {
            console.log(failure)
            this.messageCtrl.toast(failure);
            this.messageCtrl.dismiss();
          });
          
        }).catch((e) => {
          console.log(e)
          this.messageCtrl.toast("IC not found")
          this.messageCtrl.dismiss();
        });
      }
    }
    
    add(chip) {
      //this.messageCtrl.load();
      console.log(chip);
      this.navCtrl.setRoot(AddPage, { id: chip }).then(() => {
        console.log("YAAAA");
        //this.messageCtrl.dismiss();
      })
    }
    
  }
  