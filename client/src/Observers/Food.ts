import Observer from './Observer';
import container from "../dependents";
import Graphical from "../Components/Graphical";
import Material from "../Components/Material";
import PublicMap from './PublicMap';
import FoodMoveWorker from '../Workers/FoodMove.worker';
import { makeRandom, makeCanvas } from '../compatibles';
import { SNAKE_SIZE } from '../constants';

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
const halfSize = SNAKE_SIZE / 2;

export default class Food extends Observer {

  private readonly canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  private graphical: Graphical;

  private readonly mapCanvas: HTMLCanvasElement;

  private readonly interfaceSize: number[];

  private foodNumber: number = PublicMap.mapSize / 10;

  private foods: Array<any> = [];

  private animates: Array<any> = [];

  private foodMoveWorker: Worker = new FoodMoveWorker();

  private handleScoreAdded: Function;

  public constructor() {
    super();
    // 渲染 canvas
    this.canvas = makeCanvas();
    this.context = this.canvas.getContext('2d');

    // 离屏 canvas
    const material = container.get<Material>('Material');
    this.mapCanvas = material.getMap(PublicMap.mapSize, false);
    this.graphical = container.make<Graphical>('Graphical', this.mapCanvas);

    this.interfaceSize = container.get('interfaceSize');
    this.foodMoveWorker.onmessage = this.handleFoodMoveWorkerMessage.bind(this);

    this.setStates({
      x: 0, y: 0,
      snx: 0, sny: 0
    });

    this.buildTree();
    this.randomFood();
  }

  public update(timestamp: number): void {
    const { snx, sny } = this.getStates();
    for (const key in this.animates) {
      const [ x, y, color ] = this.animates[key];
      this.graphical.clearRect(x - 10, y - 10, 16, 16);
      const dy = sny + halfSize - y;
      const dx = snx + halfSize - x;
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

  public onPositionChange(x: number, y: number): void {
    const DIST = 10;
    const num = PublicMap.mapSize / TREE_SIZE - 1;
    const key = Math.floor(x / TREE_SIZE) * TREE_SIZE;
    const keys = [key];
    if (x - key < DIST && key > 0) {
      keys.push(key - 1);
    }
    if (key < num && (x + SNAKE_SIZE + 10) > key + 1) {
      keys.push(key + 1);
    }
    for (const key of keys) {
      const _f = this.foods[key];
      for (const fkey in _f) {
        const [ fx, fy ] = _f[fkey];
        this.foodMoveWorker.postMessage([x, y, SNAKE_SIZE, fx, fy, key, fkey]);
      }
    }
    this.setStates({snx: x, sny: y});
  }

  /**
   * 注册一个加分回调
   * 
   * @param callback 加分接口
   */
  public onScoreAdded(callback: Function): void {
    this.handleScoreAdded = callback;
  }

  /**
   * 检测到接近食物后，触发吸附特效
   * @param e data
   */
  private handleFoodMoveWorkerMessage(e: MessageEvent): void {
    const [ key, fkey ] = e.data;
    const food = this.foods[key][fkey];
    if (food) {
      this.animates.push([...food]);
      delete this.foods[key][fkey];
      if (this.handleScoreAdded) {
        this.handleScoreAdded();
      }
    }
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
    const elementApp = container.get<HTMLElement>('elementApp');
    elementApp.removeChild(this.canvas);
  } 
}
