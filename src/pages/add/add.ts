import { MessageController } from './../../utils/messageCtrl/messageCtrl';
import { TestingPage } from './../testing/testing';
import { Chip } from './../../utils/interfaces/chip';
import { TableProvider } from './../../providers/table/table';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})


export class AddPage {
  v;
  newChip : Chip ={
    id: '',
    pinNo: 14,
    config: '',
    test: [],
    result: [],
    info: ''
  }
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private tableService: TableProvider,
     public messageCtrl: MessageController) {
   this.v = this.navParams.get('id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  showAllChips() {
    this.tableService.getTable().then(t => {
      console.log(JSON.stringify(t));
    })
  }
  
  logForm() {
    if (this.isEmpty(this.newChip)) {
      this.messageCtrl.toast("Ops! You should fill all the blank spaces.");
    } else if (!this.newChip.id.startsWith("74ls")) {
      this.messageCtrl.toast("Ops! Invalid chip ID.");
    } else {
      this.tableService.addChip(this.newChip).then(done => {
        if (done) {
          console.log('New chip added!');
          this.showAllChips();
          this.messageCtrl.toast("New IC added!");
        } else {
          console.log('Error al añadir el chip!');
        }
      });
      this.navCtrl.setRoot(TestingPage)
    }
  }

  private isEmpty(obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
      return true;
    }
  }
}


