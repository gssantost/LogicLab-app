import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReceiverProvider } from '../../providers/receiver/receiver';
import { SerialResponse } from '../../utils/interfaces/serialResponse';
import { TableProvider } from '../../providers/table/table';
import { Chip } from '../../utils/interfaces/chip';
import { MessageController } from '../../utils/messageCtrl/messageCtrl';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  private currentChip: Chip;
  private gates: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public messageCtrl: MessageController,
    private tableService: TableProvider,
    private receiverService: ReceiverProvider) {
      this.currentChip = this.tableService.getCurrentChip();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ResultPage');
    this.currentChip = this.tableService.getCurrentChip();
    this.compareResults(this.currentChip, this.receiverService.getData());
  }

  /**
   * Método encargado de evaluar la respuesta serial. Si el status es 1, el test se completó y se procede a comparar 
   * los valores esperados contenidos en el objeto Chip seleccionado con los valores de lectura contenidos en 
   * el objeto Test
   * @param currentChip Objeto Chip seleccionado para la prueba
   * @param testChip Objeto de Repuesta Serial obtenida por el módulo de pruebas. Contiene los resultados de la prueba
   */
  compareResults(currentChip: Chip, test: SerialResponse) {
    if (test.status == 1) {

      test.result.forEach((testCase, i) => {
        let expectedResult = currentChip.result[0][i];
        testCase.forEach((value, k) => {
          if (value === expectedResult) {
            this.gates[k] = true;
          } else {
            this.gates[k] = false;
          }
        })
      })

      console.log(this.gates)
      
      this.gates.forEach((isGoodOrBad, i) => {
        console.log("Salida ", i, " funciona: ", isGoodOrBad);
      })

    } else {
      this.messageCtrl.show("", test.message);
    } 
  }

}
