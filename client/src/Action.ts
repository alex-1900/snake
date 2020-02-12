import ActionInterface from './Interfaces/ActionInterface';
import SubjectInterface from './Interfaces/SubjectInterface';

export default class Action implements ActionInterface {

  public isRunning: boolean = false;

  private animationFrameId: number = 0;

  private stopHandle: Function;

  constructor(
    private subject: SubjectInterface
  ) {
    this.process = this.process.bind(this);
  }

  /**
   * 开始运行动画，如果当前没有启动过，则启动动画帧运动
   * 如果当前动画正在运行，则不改变当前状态
   * 如果当前是暂停状态，则继续运行动画而不是重新开始
   */
  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.process);
    }
  }

  /**
   * 暂停动画
   */
  public pause(): void {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
  }

  /**
   * 停止动画运行，并恢复到初始状态
   */
  public stop(): void {
    this.isRunning = false;
    this.subject.terminate();
    cancelAnimationFrame(this.animationFrameId);
    if (this.stopHandle) {
      this.stopHandle.apply(this, this);
    }
  }

  /**
   * 注册一个操作，在游戏结束时调用
   * @param callback 回调函数
   */
  public onStop(callback: Function) {
    this.stopHandle = callback;
  }

  /**
   * AnimationFrame 的单帧动作
   * 
   * @param timestamp 时间戳
   */
  private process(timestamp: number) {
    if (this.isRunning) {
      this.subject.notify(timestamp);
      this.animationFrameId = requestAnimationFrame(this.process);
    }
  }
}
