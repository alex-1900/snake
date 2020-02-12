import container from "../dependents";

export default class Layer {
  public constructor(
    private element: HTMLElement,
  ) { }

  public getElement(): HTMLElement {
    return this.element;
  }

  /**
   * 向根节点添加一个 canvas layer
   * 
   * @return 所添加的 canvas 对象
   */
  public push(offscreen: boolean = false): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const [width, height] = container.get('interfaceSize');
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('class', 'coincide');
    if (!offscreen) {
      this.element.appendChild(canvas);
    }
    return canvas;
  }
}
