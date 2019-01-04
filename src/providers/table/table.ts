import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Table } from './tableData';
import { Chip } from '../../utils/interfaces/chip';

/*
  Generated class for the TableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableProvider {

  private currentChip: Chip;

  constructor(private nativeStorage: NativeStorage) {
    console.log('Hello TableService');
  }

  /**
   * Método que extrae la Tabla de datos sobre los microchips almacenados en NativeStorage
   */
  getTable(): Promise<Chip[]> {
    return new Promise((res, rej) => {
      this.nativeStorage.getItem('table')
        .then((value) => res(value))
        .catch((error) => rej(error))
    });
  }

  /**
   * Método que carga la Tabla en NativeStorage, en caso de no existir la misma
   */
  setTable(): Promise<Boolean> {
    return new Promise((res, rej) => {
      this.nativeStorage.setItem('table', Table)
        .then(() => res(true), 
          (error) => {
            console.log(error);
            res(false);
        });
    })
  }

  /**
   * Método que accede a la Tabla (JSON de datos) y realiza una búsqueda del chip solicitado mediante su ID o serial
   * @param id ID o serial del circuito integrado a buscar
   */
  getChip(id: string): Promise<Chip> {
    return new Promise((res, rej) => {
      this.getTable().then(table => {
        let data = table.find((chip) => chip.id === id.toUpperCase());

        if (data != null) {
          res(data);
          this.currentChip = data;
        } else {
          rej(data);
        }
      })

    });
  }

  /**
   * Método que accede a la Tabla y adiciona un nuevo objeto chip agregado por el usuario. 
   * El método reemplaza el objeto Tabla previamente existente en el NativeStorage, actualizándolo así
   * @param chip Objeto Chip con la data fundamental que se requiere para poder ser enviado al módulo de pruebas
   */
  addChip(chip: Chip): Promise<Boolean> {
    return new Promise((res, rej) => {
      this.getTable().then(table => {
        table.push(chip);
        this.nativeStorage.setItem('table', table)
          .then(
            () => res(true),
            (error) => res(false));
      })
    })
  }

  /**
   * Método que verifica si la propiedad para la Tabla existe en el almacenamiento nativo
   */
  isEmpty(): Promise<Boolean> {
    return this.nativeStorage.keys()
      .then(keys =>
        keys.some(k => ('table' === k))
      );
  }

  /**
   * 
   */
  getCurrentChip(): Chip {
    return this.currentChip;
  }

}