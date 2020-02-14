import container from './dependents';

/**
 * 计算并获取游戏显示界面的宽度和高度 [width, height]
 * 
 * @param clientWidth 可用区域宽度
 * @param clientHeight 可用区域高度
 */
export function getInterfaceSize(clientWidth: number, clientHeight: number) {
  const max = Math.max(clientWidth, clientHeight);
  const min = Math.min(clientWidth, clientHeight);
  const estimateLongSide = max * 9 / 16;
  if (estimateLongSide > min) {
    return [min * 16 / 9, min]
  }
  return [max, estimateLongSide];
}

/**
 * 产生随机数
 * 
 * @param min 最小值
 * @param max 最大值
 */
export function makeRandom(min: number, max: number): number {
  const range: number = max - min;   
  const rand: number = Math.random();   
  return(min + Math.round(rand * range));  
}

/**
 * 创建一个 canvas 对象
 * @param width canvas 的宽
 * @param height canvas 的高
 * @param offscreen 是否离屏
 */
export function makeCanvas(width: number|null = null, height: number|null = null, offscreen: boolean = false): HTMLCanvasElement {
  const [ interfaceWidth, interfaceHeight ] = container.get('interfaceSize');
  const elementApp = container.get<HTMLElement>('elementApp');
  const canvas = document.createElement('canvas');
  canvas.width = width === null ? interfaceWidth : width;
  canvas.height = height === null ? interfaceHeight : height;
  if (! offscreen) {
    canvas.setAttribute('class', 'coincide');
    elementApp.appendChild(canvas);
  }
  return canvas;
}