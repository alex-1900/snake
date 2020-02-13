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
import SnakeHead from '../Mixed/SnakeHead';
import SnakeBody from '../Mixed/SnakeBody';

/**
 * 蛇对象，控制蛇的动作与渲染
 */
export default class Snake extends Observer {

  private canvas: HTMLCanvasElement;

  private layer: Layer;

  private context: CanvasRenderingContext2D;

  private waitTime: number = 18;

  private angleWorker: Worker = new AngleWorker();

  private snakeHead: SnakeHead;

  private snakeBody: SnakeBody;

  private interfaceWidth: number;

  private interfaceHeight: number;

  private scores: number = 0;

  private toAngle: number = 0;

  private angle: number = 0;

  private mapX: number = 0;

  private mapY: number = 0;

  public constructor(
    private publicMap: PublicMap,
    private food: Food
  ) {
    super();
    this.layer = container.get<Layer>('Layer');
    this.canvas = this.layer.push();
    this.context = this.canvas.getContext('2d');

    const size = 30;
    const theme = makeRandom(SnakeType.Yellow, SnakeType.Cyan);
    this.snakeHead = new SnakeHead(this.context, theme, size);
    this.snakeBody = new SnakeBody(this.context, theme, size);

    this.food.onScoreAdded(this.handleScoreAdded.bind(this));
    this.angleWorker.onmessage = this.handleAngleWorkerMessage.bind(this);

    const [ width, height ] = container.get('interfaceSize');
    this.interfaceWidth = width;
    this.interfaceHeight = height;
    const initX = Math.floor(width / 2 - size / 2);
    const initY = Math.floor(height / 2 - size / 2);

    this.setStates({
      x: initX,
      y: initY,
      size,
      speed: 2,
    });

    {
      let i = 6;
      while (i--) {
        this.addSection();
      }
    }
  }

  private rotateHead() {
    const { angle } = this;
    this.snakeHead.rotate(angle);
  }

  /**
   * 更新状态的接口
   * 
   * @param timestamp 时间戳
   */
  public update(timestamp: number): void {
    // if (this.isOvertime(timestamp, 128)) {
      const { x, y, speed, size } = this.getStates();
      const { toAngle, angle } = this;
      if (angle !== toAngle) {
        this.angleWorker.postMessage([angle, toAngle, speed]);
        this.rotateHead();
      }

      let states: {[key: string]: any} = {};
      const nextX = speed * Math.cos(angle * RADIAN) + x;
      const nextY = speed * Math.sin(angle * RADIAN) + y;
      this.snakeBody.push(nextX, nextY);

      const fixR = size / 2;
      this.mapX = nextX - this.interfaceWidth / 2 + fixR;
      this.mapY = nextY - this.interfaceHeight / 2 + fixR;
      this.publicMap.updateMaxPosition(this.mapX, this.mapY);
      states = {
        x: nextX,
        y: nextY,
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

  /**
   * 渲染画面的接口
   */
  public render() {
    const { x, y } = this.getStates();
    const { size: hsize, x: hx, y: hy } = this.getHistory();
    const { mapX, mapY } = this;

    this.snakeBody.clear();
    this.snakeHead.clearRect(hx - mapX, hy - mapY, hsize);

    this.snakeBody.render(mapX, mapY);
    this.snakeHead.render(x - mapX, y - mapY);
  }

  /**
   * 摇杆的角度改变时调用的接口
   * @param angle 角度
   */
  public onCtrlAngleChange(angle: number): void {
    this.toAngle = angle;
  }

  /**
   * 在得到 worker 计算的角度后更新当前的状态
   * @param {MessageEvent} e
   */
  private handleAngleWorkerMessage(e: MessageEvent) {
    this.angle = e.data;
  }

  /**
   * 添加一截蛇身
   */
  private addSection() {
    const { x, y, speed } = this.getStates();
    this.snakeBody.add(x, y, speed, this.waitTime)
  }

  /**
   * 当 Food 对象判定得分后更新当前的状态
   * 分数对于用户没有交互 只用于改变蛇的长度
   */
  private handleScoreAdded(): void {
    const { scores } = this;
    let newScores = scores;
    if (scores >= 5) {
      newScores = scores - 4; // -5 + 1
      this.addSection();
    } else {
      newScores += 1;
    }
    this.scores = newScores;
  }

  public terminate() {
    const element = this.layer.getElement();
    element.removeChild(this.canvas);
    this.angleWorker.terminate();
  }
}
