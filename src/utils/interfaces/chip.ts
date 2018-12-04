export interface Chip {
  id: string,
  pinNo: number,
  config: string,
  test: Array<Array<number>>,
  result: Array<Array<number>>,
  info: string
}