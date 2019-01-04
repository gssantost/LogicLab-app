import { Injectable } from '@angular/core';
import { SerialResponse } from '../../utils/interfaces/serialResponse';

/*
  Generated class for the ReceiverProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReceiverProvider {

  private dataIn: SerialResponse;

  constructor() {
    console.log('Hello ReceiverService');
  }

  /**
   * Setea a la variable dataIn la respuesta obtenida desde el módulo HC-05 una vez finalizada la comunicación
   * @param response Objeto que contiene el tipo de status, valores de resultado y mensaje de la prueba realizada
   */
  setIncomingData(response: SerialResponse) {
    console.log(response);
    this.dataIn = response;
  }

  /**
   * Getter para dataIn
   */
  get(): SerialResponse {
    return this.dataIn;
  }

  clear(): void {
    this.dataIn = null;
  }

}