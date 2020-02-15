import Observer from './Observer';
import container from '../dependents';
import { SnakeType } from '../Enums/MaterialEnum';
import { RADIAN, SNAKE_SIZE } from '../constants';
import PublicMap from './PublicMap';
import ActionInterface from '../Interfaces/ActionInterface';
import Food from './Food';
import AngleWorker from '../Workers/Angle.worker';
import SnakeHead from '../Mixed/SnakeHead';
import SnakeBody from '../Mixed/SnakeBody';
import { makeRandom, makeCanvas } from '../compatibles';

/**
 * 蛇对象，控制蛇的动作与渲染
 */
export default class Snake extends Observer {

  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

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

  private framerate: number = 32;

  public constructor(
    private food: Food,
    private publicMap?: PublicMap
  ) {
    super();
    this.canvas = makeCanvas();
    this.context = this.canvas.getContext('2d');

    const theme = makeRandom(SnakeType.Yellow, SnakeType.Cyan);
    this.snakeHead = new SnakeHead(this.context, theme);
    this.snakeBody = new SnakeBody(this.context, theme);

    this.food.onScoreAdded(this.handleScoreAdded.bind(this));
    this.angleWorker.onmessage = this.handleAngleWorkerMessage.bind(this);

    const [ width, height ] = container.get('interfaceSize');
    this.interfaceWidth = width;
    this.interfaceHeight = height;
    const initX = Math.floor(width / 2 - SNAKE_SIZE / 2);
    const initY = Math.floor(height / 2 - SNAKE_SIZE / 2);

    this.setStates({
      x: initX,
      y: initY,
      speed: 4,
    });
    this.snakeBody.push(initX, initY);

    for (let i = 0; i < 5; i++) this.snakeBody.add();
  }

  /**
   * 更新状态的接口
   * 
   * @param timestamp 时间戳
   */
  public update(timestamp: number): void {
    if (this.isOvertime(timestamp, this.framerate)) {
      const { x, y, speed } = this.getStates();
      const { toAngle, angle } = this;

      // 转动事件
      if (angle !== toAngle) {
        this.angleWorker.postMessage([angle, toAngle, speed]);
        this.snakeHead.rotate(this.angle);
      }

      // 根据角度获取坐标
      const nextX = speed * Math.cos(angle * RADIAN) + x;
      const nextY = speed * Math.sin(angle * RADIAN) + y;

      // 向蛇身队列中添加坐标
      this.snakeBody.push(nextX, nextY);

      // 更新地图坐标
      const fixR = SNAKE_SIZE / 2;
      this.mapX = nextX - this.interfaceWidth / 2 + fixR;
      this.mapY = nextY - this.interfaceHeight / 2 + fixR;
      this.publicMap.updateMaxPosition(this.mapX, this.mapY);

      // 比较坐标与食物的距离
      this.food.onPositionChange(nextX, nextY);

      // 撞墙检测
      const maxPos = PublicMap.mapSize - SNAKE_SIZE;
      if (nextX <= 0 || nextY <= 0 || nextX >= maxPos || nextY >= maxPos) {
        const action = container.get<ActionInterface>('action');
        action.stop();
      }

      this.setStates({x: nextX, y: nextY});
    }
  }

  /**
   * 渲染画面的接口
   */
  public render() {
    const { x, y } = this.getStates();
    const { x: hx, y: hy } = this.getHistory();
    const { mapX, mapY } = this;

    this.snakeBody.clear();
    this.snakeHead.clearRect(hx - mapX, hy - mapY);

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

  public speedUp(): void {
    this.framerate = 16;
  }

  public speedDown(): void {
    this.framerate = 32;
  }

  /**
   * 在得到 worker 计算的角度后更新当前的状态
   * @param {MessageEvent} e
   */
  private handleAngleWorkerMessage(e: MessageEvent) {
    this.angle = e.data;
  }

  /**
   * 当 Food 对象判定得分后更新当前的状态
   * 分数对于用户没有交互 只用于改变蛇的长度
   */
  private handleScoreAdded(): void {
    const { scores } = this;
    let newScores = scores;
    if (scores >= 10) {
      newScores = scores - 9; // -5 + 1
      this.snakeBody.add();
    } else {
      newScores += 1;
    }
    this.scores = newScores;
  }

  public terminate() {
    const elementApp = container.get<HTMLElement>('elementApp');
    elementApp.removeChild(this.canvas);
    this.angleWorker.terminate();
  }
}
