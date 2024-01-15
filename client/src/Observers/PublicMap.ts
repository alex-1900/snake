import Observer from "./Observer";
import container from "../dependents";
import Material from "../Components/Material";
import Food from "./Food";
import { makeCanvas } from "../compatibles";
import {MAP_SIZE} from "../constants";

export default class PublicMap extends Observer {

  private readonly canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  private readonly mapCanvas: HTMLCanvasElement;
  
  private readonly interfaceSize: number[];

  private x: number = 0;

  private y: number = 0;

  static mapSize: number = MAP_SIZE;

  public constructor(
    private food: Food
  ) {
    super();
    this.canvas = makeCanvas();
    const material = container.get<Material>('Material');
    this.mapCanvas = material.getMap(PublicMap.mapSize);
    this.context = this.canvas.getContext('2d');
    this.interfaceSize = container.get('interfaceSize');
  }

  public update(timestamp: number): void {
    if (this.isOvertime(timestamp, 32)) {
      this.repaint(true);
    }
  }

  public render() {
    const [ width, height ] = this.interfaceSize;
    const { x, y } = this;
    this.context.clearRect(0, 0, width, height);
    this.context.drawImage(this.mapCanvas, x, y, width, height, 0, 0, width, height);
  }

  public updateMaxPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.food.setStates({x, y});
  }

  public terminate() {
    const elementApp = container.get<HTMLElement>('elementApp');
    elementApp.removeChild(this.canvas);
  } 
}
