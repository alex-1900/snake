import container from "../dependents";
import Snake from "../Observers/Snake";

export default class Control {

  private top: number = 25;
  private left: number = 25;
  private startX: number = 0;
  private startY: number = 0;

  public constructor(
    private elementRocker: HTMLElement,
    private elementSpeedUp: HTMLElement,
    private snake: Snake
  ) {
    elementRocker.ontouchstart = this.rockerTouchStart.bind(this);
    elementRocker.ontouchmove = this.rockerTouchMove.bind(this);
    elementRocker.ontouchend = this.rockerTouchEnd.bind(this);
    
    elementSpeedUp.ontouchstart = this.speedUpStart.bind(this);
    elementSpeedUp.ontouchend = this.speedUpEnd.bind(this);
  }

  speedUpStart(event: TouchEvent) {
    event.preventDefault();
    this.snake.setStates({speed: 3});
  }

  speedUpEnd(event: TouchEvent) {
    event.preventDefault();
    this.snake.setStates({speed: 2});
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
    const angle = this.getAngle(clientX, clientY, offsetX, offsetY);
    this.snake.onAngleChange(angle);
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
   * 获取角度
   * 
   * @param offsetX 摇杆内 x 轴偏移量
   * @param offsetY 摇杆内 y 轴偏移量
   */
  private getAngle(clientX: number, clientY: number, offsetX: number, offsetY: number) {
    const radian = 180 / Math.PI;
    if (clientX >= this.startX && clientY >= this.startY) {
      return Math.floor((Math.atan(offsetY / offsetX) * radian));
    } else if (clientX <= this.startX && clientY >= this.startY) {
      return Math.floor((Math.atan(-offsetX / offsetY) * radian)) + 90;
    } else if (clientX < this.startX && clientY < this.startY) {
      return Math.floor((Math.atan(-offsetY / -offsetX) * radian)) + 180;
    } else if (clientX > this.startX && clientY < this.startY) {
      return Math.floor((Math.atan(-offsetX / offsetY) * radian)) + 270;
    }
    return 0;
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
}
