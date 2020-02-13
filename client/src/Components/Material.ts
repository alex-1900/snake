import container from '../dependents';
import Graphical from './Graphical';
import { SnakeType } from '../Enums/MaterialEnum';

export const snakeTheme: {[key: number]: string[]} = {
  [SnakeType.Red]: ['#B22222', '#8B0000'],
  [SnakeType.Yellow]: ['#FFD700', '#DAA520'],
  [SnakeType.Blue]: ['#4682B4', '#000080'],
  [SnakeType.Cyan]: ['#00CED1', '#20B2AA']
};

export default class Material {

  private snakeHeads: {[key: number]: HTMLCanvasElement} = {};
  private snakeSections: {[key: number]: HTMLCanvasElement} = {};

  public constructor() {
    const size = 30;
    this.snakeHeads[SnakeType.Red] = this.snakeHeadToCanvas('#B22222', size);
    this.snakeHeads[SnakeType.Yellow] = this.snakeHeadToCanvas('#FFD700', size);
    this.snakeHeads[SnakeType.Blue] = this.snakeHeadToCanvas('#4682B4', size);
    this.snakeHeads[SnakeType.Cyan] = this.snakeHeadToCanvas('#00CED1', size);

    this.snakeSections[SnakeType.Red] = this.snakeSectionToCanvas('#B22222', '#8B0000', size);
    this.snakeSections[SnakeType.Yellow] = this.snakeSectionToCanvas('#FFD700', '#DAA520', size);
    this.snakeSections[SnakeType.Blue] = this.snakeSectionToCanvas('#4682B4', '#000080', size);
    this.snakeSections[SnakeType.Cyan] = this.snakeSectionToCanvas('#00CED1', '#20B2AA', size);
  }

  /**
   * 按种类获取一个蛇头的素材
   * 
   * @param type 种类常量
   */
  public getSnakeHead(type: SnakeType): HTMLCanvasElement {
    return this.snakeHeads[type];
  }

  public getSnakeSection(type: SnakeType): HTMLCanvasElement {
    return this.snakeSections[type];
  }

  public getMap(size: number, withBackground: boolean = true): HTMLCanvasElement {
    const canvas = this.makeCanvas(5000, 5000);
    if (withBackground) {
      const graphical = container.make<Graphical>('Graphical', canvas);
      graphical.mapBackground(20, size);
    }
    return canvas;
  }

  /**
   * 画一个蛇头，并返回生成的 canvas
   * 
   * @param color 蛇头颜色
   * @param size 画布大小
   */
  public snakeHeadToCanvas(color: string, size: number): HTMLCanvasElement {
    const canvas = this.makeCanvas(size, size);
    const graphical = container.make<Graphical>('Graphical', canvas);
    graphical.snakeHead(size/2, size/2, size/2, color);
    return canvas;
  }

  /**
   * 画一截蛇身，并返回生成的 canvas
   * 
   * @param pColor 主色
   * @param sColor 副色
   * @param size 画布大小
   */
  public snakeSectionToCanvas(pColor: string, sColor: string, size: number): HTMLCanvasElement {
    const canvas = this.makeCanvas(80, 80);
    const graphical = container.make<Graphical>('Graphical', canvas);
    graphical.snakeSection(size/2, size/2, size/2, pColor, sColor);
    return canvas;
  }

  /**
   * Create a canvas with width height.
   * 
   * @param width canvas width
   * @param height canvas height
   */
  public makeCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
}
