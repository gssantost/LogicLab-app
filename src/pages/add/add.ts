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

    console.log(this.newChip);
    this.tableService.addChip(this.newChip).then(done => {
      if (done) {
        console.log('New chip added!');
        this.showAllChips();
        this.messageCtrl.show("Alerta","Chip agregado satisfactoriamente")
      } else {
        console.log('Error al añadir el chip!');
      }
    });
    this.navCtrl.push(TestingPage)
  }
  }


