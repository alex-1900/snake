import ObserverInterface from "../Interfaces/ObserverInterface";

export default abstract class Observer implements ObserverInterface {

  private states: {[key: string]: any} = {};

  private history: {[key: string]: any} = {};

  private repaintState: boolean = false;

  private timeMap = new Map<number, number>();

  /**
   * 在动画刷新时将通知此接口，你应当在这里更新成员状态，而不是实质的渲染
   * 
   * @param timestamp 当前刷新的时间戳
   */
  public abstract update(timestamp: number): void;

  /**
   * 批量设置状态
   * @param states 保存 states 的键值对
   */
  public setStates(states: {[key: string]: any}): void {
    this.repaint(true);
    this.states = {
      ...this.states,
      ...states
    }
  }

  /**
   * 获取 states
   */
  public getStates(): {[key: string]: any} {
    return this.states;
  }

  public getHistory(): {[key: string]: any} {
    return this.history;
  }

  /**
   * 检查当前观察者是否需要重绘
   */
  needRepaint(): boolean {
    return this.repaintState;
  }

  /**
   * 设置是否需要重绘
   * 
   * @param state 重绘的状态
   */
  repaint(state: boolean): void {
    this.repaintState = state;
    if (state) {
      this.history = this.states;
    }
  }

  /**
   * 检测当前与上一次刷新的时间间隔，可以多次或重复使用
   * 
   * @param timestamp 当前时间戳
   * @param msecond 间隔的毫秒数
   */
  protected isOvertime(timestamp: number, msecond: number): boolean {
    if (! this.timeMap.has(msecond)) {
      this.timeMap.set(msecond, 0);
    }

    if (msecond <= timestamp - this.timeMap.get(msecond)) {
      this.timeMap.set(msecond, timestamp);
      return true;
    }

    return false;
  }
}
