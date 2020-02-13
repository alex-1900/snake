import container from "../dependents";
import Material, { snakeTheme } from '../Components/Material';
import { SnakeType } from "../Enums/MaterialEnum";
import { RADIAN } from "../constants";

export default class SnakeHead {

  private sourceCanvas: HTMLCanvasElement;

  private sourceContext: CanvasRenderingContext2D;

  private offscreenCanvas: HTMLCanvasElement;

  private offscreenContext: CanvasRenderingContext2D;

  public constructor(
    private context: CanvasRenderingContext2D,
    theme: SnakeType,
    private size: number
  ) {
    const material = container.get<Material>('Material');
    const [ primaryColor ] = snakeTheme[theme];
    this.sourceCanvas = material.snakeHeadToCanvas(primaryColor, size);
    this.sourceContext = this.sourceCanvas.getContext('2d');
    this.sourceContext.globalAlpha = 1;

    const halfSize = size / 2;
    this.offscreenCanvas = material.makeCanvas(size, size);
    this.offscreenContext = this.offscreenCanvas.getContext('2d');
    this.offscreenContext.translate(halfSize, halfSize);
    this.offscreenContext.drawImage(this.sourceCanvas, -halfSize, -halfSize);
  }

  public rotate(angle: number): void {
    const { size } = this;
    const halfSize = size / 2;
    const clearPos = -halfSize - 5;
    const clearSize = size + 10;

    this.offscreenContext.save();
    this.offscreenContext.clearRect(clearPos, clearPos, clearSize, clearSize);
    this.offscreenContext.rotate(angle * RADIAN);
    this.offscreenContext.drawImage(this.sourceCanvas, -halfSize, -halfSize);
    this.offscreenContext.restore();
  }

  public clearRect(x: number, y: number, size: number): void {
    const clearSize = size + 10;
    this.context.clearRect(x - 5, y - 5, clearSize, clearSize);
  }

  public render(x: number, y: number): void {
    this.context.drawImage(this.offscreenCanvas, x, y);
  }
}
