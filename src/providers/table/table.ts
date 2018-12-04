import { Injectable } from '@angular/core';
import { Table } from './tableData';
import { Chip } from '../../utils/interfaces/chip';

/*
  Generated class for the TableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableProvider {

  getChip(id: string): Promise<Chip> {
    return new Promise((resolve, reject) => {
      let data = Table.find((c) => c.id === id.toUpperCase())

      setTimeout(() => {
        if (data != null) {
          resolve(data)
        } else {
          reject(data)
        }
      }, 2000);
      
    });
  }

}
