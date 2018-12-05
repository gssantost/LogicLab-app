import { Chip } from '../../utils/interfaces/chip';

export const Table: Chip[] = [
  {
    id: '74LS04',
    pinNo: 14,
    config: 'OIOIOIGIOIOIOV',
    test: [[0], [1]],
    result: [[0], [1]],
    info: 'NOT - 6 Compuertas Inversoras'
  },
  {
    id: '74LS08',
    pinNo: 14,
    config: 'OOIOOIGIOOIOOV',
    test: [[0,0], [0,1], [1,0], [1,1]],
    result: [[0,0,0,1]], 
    info: 'AND - 4 Compuertas'
  },
  {
    id: '74LS02',
    pinNo: 14,
    config: 'OOIOOIGIOOIOOV',
    test: [[0,0], [0,1], [1,0], [1,1]],
    result: [[0, 1, 1, 1]],
    info: 'OR - 4 Compuertas de 2 Entradas'
  },
  {
    id: '74LS00',
    pinNo: 14,
    config: 'OOIOOIGIOOIOOV',
    test: [[0, 0], [0, 1], [1, 0], [1, 1]],
    result: [[0, 1, 1, 1]],
    info: 'OR - 4 Compuertas de 2 Entradas'
  },
];

/*
  {
    id: '74LS04',
    pinNo: 14,
    config: 'OIOIOIGIOIOIOV',
    test: [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ],
    result: [ [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0] ],
    info: '6 Compuertas Inversoras NOT'
  }
*/