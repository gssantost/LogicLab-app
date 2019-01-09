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
  private test: SerialResponse;
  private gates: Array<Boolean>; // Arreglo de banderas true/false para indicar el estado Positivo o Negativo

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public uiCtrl: MessageController,
    private tableService: TableProvider,
    private receiverService: ReceiverProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ResultPage');
    this.currentChip = this.tableService.getCurrentChip();
    this.compareResults(this.currentChip, this.receiverService.get());
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
      console.log("Aqui");
      currentChip.result.forEach((value, i) => {
        if (test.result[i] === value) {
          console.log("Valor obtenido: " + test.result[i], " Valor esperado: " + value);
          this.gates.push(true);
        } else {
          console.log("Valor obtenido: " + test.result[i], " Valor esperado: " + value);
          this.gates.push(false);
        }
      })
    } else {
      console.log("Else");
      this.uiCtrl.show("", test.message);
    } 
  }

}
