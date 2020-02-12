import Observer from './Observer';
import container from "../dependents";
import Layer from "../Components/Layer";
import Graphical from "../Components/Graphical";
import Material from "../Components/Material";
import PublicMap from './PublicMap';

function makeRandom(min: number, max: number) {
  const range = max - min;   
  const rand = Math.random();   
  return(min + Math.round(rand * range));  
}

const foodColors: Array<string> = [
  '#F08080',
  '#F5DEB3',
  '#98FB98',
  '#ADD8E6',
  '#40E0D0',
  '#FFC0CB',
  '#DDA0DD'
];

const TREE_SIZE = 100;

export default class Food extends Observer {

  private canvas: HTMLCanvasElement;

  private layer: Layer;

  private context: CanvasRenderingContext2D;

  private graphical: Graphical;

  private mapCanvas: HTMLCanvasElement;

  private interfaceSize: number[];

  private foodNumber: number = PublicMap.mapSize / 10;

  private foods: Array<any> = [];

  private animates: Array<any> = [];

  public constructor() {
    super();
    this.layer = container.get<Layer>('Layer');
    this.canvas = this.layer.push();
    const material = container.get<Material>('Material');
    this.mapCanvas = material.getMap(PublicMap.mapSize, false);
    this.graphical = container.make<Graphical>('Graphical', this.mapCanvas);
    this.context = this.canvas.getContext('2d');
    this.interfaceSize = container.get('interfaceSize');

    this.setStates({
      x: 0, y: 0,
      snx: 0, sny: 0
    });

    this.buildTree();
    this.randomFood();
  }

  public update(timestamp: number): void {
    // pass
    const { snx, sny } = this.getStates();
    for (const key in this.animates) {
      const [ x, y, color ] = this.animates[key];
      this.graphical.clearRect(x - 10, y - 10, 16, 16);
      const dy = sny - y;
      const dx = snx - x;
      const nextX = Math.abs(dx / dy) * (dx < 0 ? -1 : 1) + x;
      const nextY = (dy < 0 ? -1 : 1) + y;
      this.animates[key] = [nextX, nextY, color];
      if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) <= 10) {
        delete this.animates[key];
        this.makeFood();
      }
    }
  }

  public render() {
    const [ width, height ] = this.interfaceSize;
    const { x, y } = this.getStates();
    this.context.clearRect(0, 0, width, height);

    for (const key in this.animates) {
      const [ x, y, color ] = this.animates[key];
      this.graphical.food(x, y, color)
    }
    this.context.drawImage(this.mapCanvas, x, y, width, height, 0, 0, width, height);
  }

  public onPositionChange(x: number, y: number, size: number): number {
    const DIST = 10;
    const num = PublicMap.mapSize / TREE_SIZE - 1;
    const key = Math.floor(x / TREE_SIZE) * TREE_SIZE;
    const keys = [key];
    let scores: number = 0;
    if (x - key < DIST && key > 0) {
      keys.push(key - 1);
    }
    if (key < num && (x + size + 10) > key + 1) {
      keys.push(key + 1);
    }
    for (const key of keys) {
      const _f = this.foods[key];
      for (const fkey in _f) {
        const [ fx, fy, color ] = _f[fkey];
        const r = size / 2;
        if (this.collisionCheck(x + r, y + r, r, fx, fy, 4)) {
          scores++;
          this.animates.push([fx, fy, color]);
          delete this.foods[key][fkey];
        }
      }
    }
    this.setStates({snx: x, sny: y});
    return scores;
  }

  private collisionCheck(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ) {
    const dist = Math.sqrt(
      Math.pow(x1 - x2, 2) +
      Math.pow(y1 - y2, 2)
    );
    return Boolean((r1 + r2) + 40 >= dist);
  }

  private buildTree(): void {
    const num = PublicMap.mapSize / TREE_SIZE;
    for (let i = 0; i < num; i++) {
      this.foods[i * TREE_SIZE] = [];
    }
  }

  private randomFood() {
    for (let i = 0; i < this.foodNumber; i++) {
      this.makeFood();
    }
  }

  private makeFood() {
    const x = makeRandom(4, PublicMap.mapSize - 4);
    const y = makeRandom(4, PublicMap.mapSize - 4);
    const color = makeRandom(0, foodColors.length - 1);
    this.graphical.food(x, y, foodColors[color]);
    const key = Math.floor(x / TREE_SIZE) * TREE_SIZE;
    this.foods[key].push([x, y, foodColors[color]]);
  }

  public terminate() {
    const element = this.layer.getElement();
    element.removeChild(this.canvas);
  } 
}
