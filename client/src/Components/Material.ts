import container from '../dependents';
import Graphical from './Graphical';
import { SnakeType } from '../Enums/MaterialEnum';
import { makeCanvas } from '../compatibles';

export const snakeTheme: {[key: number]: string[]} = {
  [SnakeType.Red]: ['#B22222', '#8B0000'],
  [SnakeType.Yellow]: ['#FFD700', '#DAA520'],
  [SnakeType.Blue]: ['#4682B4', '#000080'],
  [SnakeType.Cyan]: ['#00CED1', '#20B2AA']
};

export default class Material {

  /**
   * 创建一个地图
   * 
   * @param size 地图宽高
   * @param withBackground 是否画背景线条
   */
  public getMap(size: number, withBackground: boolean = true): HTMLCanvasElement {
    const canvas = makeCanvas(5000, 5000, true);
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
    const canvas = makeCanvas(size, size, true);
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
    const canvas = makeCanvas(size, size, true);
    const graphical = container.make<Graphical>('Graphical', canvas);
    const halfSize = size / 2;
    graphical.snakeSection(halfSize, halfSize, halfSize, pColor, sColor);
    return canvas;
  }
}
