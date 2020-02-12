import Observer from './Observer';
import container from '../dependents';
import Layer from '../Components/Layer';
import Graphical from '../Components/Graphical';
import Material from '../Components/Material';
import { SnakeType } from '../Enums/MaterialEnum';
import { RADIAN } from '../constants';
import { SnakeSection } from '../Types/BaseTypes';
import PublicMap from './PublicMap';
import ActionInterface from '../Interfaces/ActionInterface';
import Food from './Food';

/**
 * 蛇对象，控制蛇的动作与渲染
 */
export default class Snake extends Observer {

  private canvas: HTMLCanvasElement;

  private offCanvas: HTMLCanvasElement;

  private layer: Layer;

  private context: CanvasRenderingContext2D;

  private offLayer: Layer;

  private offscreenContext: CanvasRenderingContext2D;

  private headContext: CanvasRenderingContext2D;

  private head: HTMLCanvasElement;
  private _head: HTMLCanvasElement;

  private section: HTMLCanvasElement;

  private sections: Array<SnakeSection> = [];

  private positions: Array<any> = [];

  static WAIT_TIME = 18;

  public constructor(
    private publicMap: PublicMap,
    private food: Food
  ) {
    super();
    this.offLayer = container.get<Layer>('Layer');
    this.offCanvas = this.offLayer.push(true);
    this.offscreenContext = this.offCanvas.getContext('2d');

    this.layer = container.get<Layer>('Layer');
    this.canvas = this.layer.push();
    const graphical = container.make<Graphical>('Graphical', this.canvas);
    const material = container.get<Material>('Material');
    this.context = graphical.getContext();
    const head = material.getSnakeHead(SnakeType.Yellow);
    this._head = head;
    
    this.head = material.makeCanvas(80, 80);
    this.headContext = this.head.getContext('2d');
    this.headContext.translate(40, 40);
    this.headContext.drawImage(head, -40, -40);

    this.section = material.getSnakeSection(SnakeType.Yellow);

    this.setStates({
      interfaceSize: container.get('interfaceSize'),
      x: 500,
      y: 600,
      size: 30,
      speed: 2,
      angle: 0,
      toAngle: 0,
      sectionEnd: false,

      mapX: 0,
      mapY: 0,
      scores: 0,
    });

    this.addSection();
    this.addSection();
    this.addSection();
    this.addSection();
    this.addSection();
    this.addSection();
  }

  private rotateHead() {
    const { angle } = this.getStates();
    this.headContext.save();
    this.headContext.clearRect(-45, -45, 95, 95);
    this.headContext.rotate(angle * RADIAN);
    this.headContext.drawImage(this._head, -40, -40);
    this.headContext.restore();
  }

  /**
   * 更新状态的接口
   * 
   * @param timestamp 时间戳
   */
  public update(timestamp: number): void {
    // if (this.isOvertime(timestamp, 32)) {
      const { x, y, speed, angle, toAngle, sectionEnd, size, scores, interfaceSize: [width, height] } = this.getStates();
      if (angle !== toAngle) {
        this.eachAngle();
        this.rotateHead();
      }
      let states: {[key: string]: any} = {};
      const nextX = speed * Math.cos(angle * RADIAN) + x;
      const nextY = speed * Math.sin(angle * RADIAN) + y;
      const mapX = nextX - width / 2 + size / 2;
      const mapY = nextY - height / 2 + size / 2;
      this.publicMap.updateMaxPosition(mapX, mapY);
      states = {
        x: nextX,
        y: nextY,
        mapX,
        mapY
      };
      this.positions.push([nextX, nextY]);

      const maxPos = PublicMap.mapSize - size;
      if (nextX <= 0 || nextY <= 0 || nextX >= maxPos || nextY >= maxPos) {
        const action = container.get<ActionInterface>('action');
        action.stop();
      }

      // 食物检测
      const ates = this.food.onPositionChange(nextX, nextY, size);
      if (ates) {
        if (scores >= 5) {
          states.scores = scores - 5 + ates;
          this.addSection();
        } else {
          states.scores = scores + ates;
        }
      }
      this.setStates(states);
    // }
  }

  /**
   * 渲染画面的接口
   */
  public render() {
    const { size, x, y, mapX, mapY, sectionEnd, interfaceSize: [width, height] } = this.getStates();
    const { size: hsize, x: hx, y: hy } = this.getHistory();
    const { offscreenContext, context } = this;

    if (sectionEnd) {
      this.positions.shift();
    }

    this.clearSections();
    offscreenContext.clearRect(hx - mapX - 10, hy - mapY - 10, hsize + 20, hsize + 20);

    this.renderSections();
    offscreenContext.drawImage(this.head, 0, 0, 80, 80, x - mapX, y - mapY, size, size);

    context.clearRect(0, 0, width, height);
    context.drawImage(this.offCanvas,0, 0);
  }

  /**
   * 清除蛇身
   */
  private clearSections(): void {
    const { size: hsize } = this.getHistory();
    const { offscreenContext } = this;

    for (const section of this.sections) {
      offscreenContext.clearRect(section.lastX - 10, section.lastY - 10, hsize + 20, hsize + 20);
    }
  }

  /**
   * 渲染蛇身
   */
  private renderSections(): void {
    const { size, mapX, mapY, sectionEnd } = this.getStates();
    const { offscreenContext } = this;

    const reverseStore: Array<any> = [];
    for (const section of this.sections) {
      if (0 !== section.waitTime) {
        section.waitTime--;
        break;  // 后面的必等待
      }
      const position = this.positions[section.position];
      if (position) {
        const [x, y] = position;
        reverseStore.unshift([x, y]);
        if (section.isLast) {
          this.setStates({sectionEnd: true});
        }
        if (! this.getStates().sectionEnd) {
          section.position++;
        }
        section.lastX = x - mapX;
        section.lastY = y - mapY;
      }
    }

    for (const [x, y] of reverseStore) {
      offscreenContext.drawImage(this.section, 0,0, 80, 80, x - mapX, y - mapY, size, size);
    }
  }

  /**
   * 添加一截蛇身
   */
  private addSection() {
    const { x, y, speed } = this.getStates();
    const waitTime = Snake.WAIT_TIME / speed;
    const lastSection = this.sections[this.sections.length - 1];
    let lastX = x;
    let lastY = y;
    if (lastSection) {
      lastSection.isLast = false;
      lastX = lastSection.lastX;
      lastY = lastSection.lastY;
    }
    this.sections.push({
      isLast: true,
      lastX,
      lastY,
      waitTime,
      position: 0
    });
    this.setStates({sectionEnd: false});
  }

  public onAngleChange(angle: number): void {
    this.setStates({toAngle: angle});
  }

  /**
   * 得到一次更新的角度
   */
  private eachAngle() {
    const { angle, toAngle, speed } = this.getStates();
    let nextAngle = angle;
    const accelerate = speed * 3;
    if (Math.abs(toAngle - angle) < 180) {
      if (toAngle - angle > 0) {
        nextAngle += accelerate;
      }
      if (toAngle - angle < 0) {
        nextAngle -= accelerate;
      }
    }
    if (Math.abs(toAngle - angle) > 180) {
      if (toAngle - angle > 0) {
        nextAngle -= accelerate;
      }
      if (toAngle - angle < 0) {
        nextAngle += accelerate;
      }
    }
    if (angle > 360) {
      nextAngle -= 360
    }
    if (angle < 0) {
      nextAngle += 360
    }
    if (Math.abs(toAngle - angle) < accelerate) {
      nextAngle = toAngle;
    }
    this.setStates({angle: nextAngle});
  }

  public terminate() {
    const element = this.layer.getElement();
    element.removeChild(this.canvas);
  }
}
