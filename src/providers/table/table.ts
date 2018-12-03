import { Injectable } from '@angular/core';
import CHIPDATA from '../../helpers/chip-data';

/*
  Generated class for the TableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableProvider {

  /* constructor(public http: HttpClient) {
    console.log('Hello TableProvider Provider');
  }*/

  getChip(id: string) {
    return CHIPDATA.find((c) => c.id === id);
  }

}
