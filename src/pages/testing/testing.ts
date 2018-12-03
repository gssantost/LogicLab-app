import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TableProvider } from '../../providers/table/table';

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
    public navParams: NavParams,
    private tableService: TableProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingPage');
  }

  send() {
    
  }

  check(id: string) {
    let chipData = this.tableService.getChip(id.toUpperCase());
    console.log(chipData);
  }

}
