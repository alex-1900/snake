import SubjectInterface from "./SubjectInterface";

/**
 * 观察者，监听帧的刷新
 */
export default interface ObserverInterface
{
  /**
   * 在动画刷新时将通知此接口，你应当在这里更新成员状态，而不是实质的渲染
   * 
   * @param timestamp 当前刷新的时间戳
   */
  update?(timestamp: number): void;

  /**
   * 在更新状态之后，会通知此接口，以便对画面进行渲染
   */
  render?(): void;

  /**
   * 批量设置状态
   * @param states 保存 states 的键值对
   */
  setStates(states: {[key: string]: any}): void;

  /**
   * 终止当前观察者对象
   */
  terminate?(): void;

  /**
   * 检查当前观察者是否需要重绘
   */
  needRepaint(): boolean;

  /**
   * 设置是否需要重绘
   * 
   * @param state 重绘的状态
   */
  repaint(state: boolean): void;

  /**
   * 观察者可以将有用的数据同步到其他玩家的客户端
   * 在这里返回相应的数据给请求组件
   */
  getRemoteData?(): any;
}
