export type Instantiable = {
  new(...args: any[]): any;
}

export type SnakeSection = {
  isLast: boolean,
  lastX: number,
  lastY: number,
  waitTime: number,
  position: 0
}
