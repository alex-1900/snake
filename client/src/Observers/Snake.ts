import Observer from './Observer';
import container from '../dependents';
import { makeRandom } from '../commons';
import Layer from '../Components/Layer';
import Graphical from '../Components/Graphical';
import Material from '../Components/Material';
import { SnakeType } from '../Enums/MaterialEnum';
import { RADIAN } from '../constants';
import { SnakeSection } from '../Types/BaseTypes';
import PublicMap from './PublicMap';
import ActionInterface from '../Interfaces/ActionInterface';
import Food from './Food';
import AngleWorker from '../Workers/Angle.worker';

/**
 * 蛇对象，控制蛇的动作与渲染
 */
export default class Snake extends Observer {

  private canvas: HTMLCanvasElement;

  private layer: Layer;

  private context: CanvasRenderingContext2D;

  private headContext: CanvasRenderingContext2D;

  private head: HTMLCanvasElement;
  private _head: HTMLCanvasElement;

  private section: HTMLCanvasElement;

  private sections: Array<SnakeSection> = [];

  private positions: Array<any> = [];

  private angleWorker: Worker = new AngleWorker();

  public constructor(
    private publicMap: PublicMap,
    private food: Food
  ) {
    super();
    const theme = makeRandom(SnakeType.Yellow, SnakeType.Cyan);
    this.layer = container.get<Layer>('Layer');
    this.canvas = this.layer.push();
    const graphical = container.make<Graphical>('Graphical', this.canvas);
    const material = container.get<Material>('Material');
    this.context = graphical.getContext();
    this.context.globalAlpha = 1;
    const head = material.getSnakeHead(theme);
    this._head = head;

    this.head = material.makeCanvas(30, 30);
    this.headContext = this.head.getContext('2d');
    this.headContext.globalAlpha = 1;
    this.headContext.translate(15, 15);
    this.headContext.drawImage(head, -15, -15);
    this.section = material.getSnakeSection(theme);
    this.angleWorker.onmessage = this.handleAngleWorkerMessage.bind(this);

    this.food.onScoreAdded(this.handleScoreAdded.bind(this));

    this.setStates({
      interfaceSize: container.get('interfaceSize'),
      x: 500,
      y: 600,
      size: 30,
      waitTime: 18,
      speed: 2,
      angle: 0,
      toAngle: 0,
      sectionEnd: false,

      mapX: 0,
      mapY: 0,
      scores: 0,
    });

    {
      let i = 6;
      while (i--) {
        this.addSection();
      }
    }
  }

  private rotateHead() {
    const { angle } = this.getStates();
    this.headContext.save();
    this.headContext.clearRect(-20, -20, 40, 40);
    this.headContext.rotate(angle * RADIAN);
    this.headContext.drawImage(this._head, -15, -15);
    this.headContext.restore();
  }

  /**
   * 更新状态的接口
   * 
   * @param timestamp 时间戳
   */
  public update(timestamp: number): void {
    // if (this.isOvertime(timestamp, 32)) {
      const { x, y, speed, angle, toAngle, size, scores, interfaceSize: [width, height] } = this.getStates();
      if (angle !== toAngle) {
        this.angleWorker.postMessage([angle, toAngle, speed]);
        this.rotateHead();
      }

      let states: {[key: string]: any} = {};
      const nextX = speed * Math.cos(angle * RADIAN) + x;
      const nextY = speed * Math.sin(angle * RADIAN) + y;
      this.positions.push([nextX, nextY]);

      const fixR = size / 2;
      const mapX = nextX - width / 2 + fixR;
      const mapY = nextY - height / 2 + fixR;
      this.publicMap.updateMaxPosition(mapX, mapY);
      states = {
        x: nextX,
        y: nextY,
        mapX,
        mapY,
      };

      const maxPos = PublicMap.mapSize - size;
      if (nextX <= 0 || nextY <= 0 || nextX >= maxPos || nextY >= maxPos) {
        const action = container.get<ActionInterface>('action');
        action.stop();
      }

      // 食物检测
      this.food.onPositionChange(nextX, nextY, size);
      this.setStates(states);
    // }
  }

  private handleScoreAdded(): void {
    const { scores } = this.getStates();
    let newScores = scores;
    if (scores >= 5) {
      newScores = scores - 4; // -5 + 1
      this.addSection();
    } else {
      newScores += 1;
    }
    this.setStates({scores: newScores});
  }

  /**
   * 渲染画面的接口
   */
  public render() {
    const { x, y, mapX, mapY, sectionEnd } = this.getStates();
    const { size: hsize, x: hx, y: hy } = this.getHistory();
    const { context } = this;

    if (sectionEnd) {
      this.positions.shift();
    }

    this.clearSections();
    context.clearRect(hx - mapX - 5, hy - mapY - 5, hsize + 10, hsize + 10);

    this.renderSections();
    context.drawImage(this.head, x - mapX, y - mapY);
  }

  /**
   * 清除蛇身
   */
  private clearSections(): void {
    const { size: hsize } = this.getHistory();
    const { context } = this;

    for (const section of this.sections) {
      context.clearRect(section.lastX - 5, section.lastY - 5, hsize + 10, hsize + 10);
    }
  }

  /**
   * 渲染蛇身
   */
  private renderSections(): void {
    const { mapX, mapY } = this.getStates();
    const { context } = this;

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
      context.drawImage(this.section, x - mapX, y - mapY);
    }
  }

  /**
   * 添加一截蛇身
   */
  private addSection() {
    const { x, y, speed, waitTime } = this.getStates();
    const newWaitTime = waitTime / speed;
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
      waitTime: newWaitTime,
      position: 0
    });
    this.setStates({sectionEnd: false});
  }

  public onCtrlAngleChange(angle: number): void {
    this.setStates({toAngle: angle});
  }

  private handleAngleWorkerMessage(e: any) {
    this.setStates({angle: e.data});
  }

  public terminate() {
    const element = this.layer.getElement();
    element.removeChild(this.canvas);
    this.angleWorker.terminate();
  }
}
