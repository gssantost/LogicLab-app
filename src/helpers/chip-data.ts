export default [
  {
    id: '74LS04',
    pinNo: 14,
    config: 'OIOIOIGIOIOIOV',
    test: [ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ],
    result: [ [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0] ],
    info: {
      description: '6 Compuertas Inversoras NOT',
    }
  },
  {
    id: '7LS08',
    pinNo: 14,
    config: 'OIOIOIGIOIOIOV',
    test: [ [1, 2] ],
    result: [ [2, 1] ],
    info: {
      description: '4 Compuertas Inversoras AND'
    }
  }
];