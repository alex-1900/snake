import container from "../dependents";
import Snake from "../Observers/Snake";
import ActionInterface from "../Interfaces/ActionInterface";
import CtrlAngleWorker from '../Workers/CtrlAngle.worker';

export default class Control {

  private top: number = 25;
  private left: number = 25;
  private startX: number = 0;
  private startY: number = 0;

  private readonly isHorizon: boolean;

  private action: ActionInterface;

  private ctrlAngleWorker: Worker = new CtrlAngleWorker();

  public constructor(
    private elementRocker: HTMLElement,
    elementSpeedUp: HTMLElement,
    private snake: Snake
  ) {
    elementRocker.ontouchstart = this.rockerTouchStart.bind(this);
    elementRocker.ontouchmove = this.rockerTouchMove.bind(this);
    elementRocker.ontouchend = this.rockerTouchEnd.bind(this);
    
    elementSpeedUp.ontouchstart = this.speedUpStart.bind(this);
    elementSpeedUp.ontouchend = this.speedUpEnd.bind(this);

    this.ctrlAngleWorker.onmessage = this.handleCtrlAngleWorkerMessage.bind(this);
    this.action = container.get<ActionInterface>('action');

    const { clientWidth, clientHeight } = document.body;
    this.isHorizon = Boolean(clientWidth > clientHeight);
  }

  speedUpStart(event: TouchEvent) {
    event.preventDefault();
    this.snake.speedUp();
  }

  speedUpEnd(event: TouchEvent) {
    event.preventDefault();
    this.snake.speedDown();
  }

  /**
   * 手指接触摇杆，记录初始位置
   * 
   * @param event
   */
  private rockerTouchStart(event: TouchEvent) {
    event.preventDefault();
    const { clientX, clientY } = event.targetTouches[0];
    this.startX = clientX;
    this.startY = clientY;
  }

  /**
   * 摇杆移动，并控制视觉元素
   * 
   * @param event
   */
  private rockerTouchMove(event: TouchEvent) {
    event.preventDefault();
    const { clientX, clientY } = event.targetTouches[0];
    const [ offsetX, offsetY ] = this.getRockerOffset(clientX, clientY);
    const innerX = this.left + offsetX;
    const innerY = this.top + offsetY;
    this.elementRocker.style.left = `${innerX}px`;
    this.elementRocker.style.top = `${innerY}px`;
    this.ctrlAngleWorker.postMessage([clientX, clientY, offsetX, offsetY, this.startX, this.startY, this.isHorizon]);
  }

  /**
   * 手指离开，摇杆归位
   * 
   * @param event
   */
  private rockerTouchEnd(event: TouchEvent) {
    event.preventDefault();
    this.elementRocker.style.top = this.top + 'px';
    this.elementRocker.style.left = this.left + 'px';
  }

  /**
   * 对 worker 中计算得到的角度值进行处理
   * 
   * @param {MessageEvent} e
   */
  private handleCtrlAngleWorkerMessage(e: MessageEvent): void {
    this.snake.onCtrlAngleChange(e.data);
  }

  /**
   * 获取摇杆的偏移量
   * 
   * @param x 手指的 x 坐标
   * @param y 手指的 y 坐标
   */
  private getRockerOffset(x: number, y: number): Array<number> {
    const { clientWidth: width, clientHeight: height } = document.body;
    let offsetX = x - this.startX;
    let offsetY = y - this.startY;
    if (width < height) {
      [ offsetX, offsetY ] = [ offsetY, -offsetX ];
    }
    const longSide = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
    if (longSide > 25) {
      const proportion = 25 / longSide;
      offsetX = offsetX * proportion;
      offsetY = offsetY * proportion;
    }
    return [offsetX, offsetY];
  }

  public terminate(): void {
    this.ctrlAngleWorker.terminate();
  } 
}
