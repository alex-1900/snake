/**
 * 用于控制动画的刷新功能
 */
export default interface ActionInterface {
  /**
   * 开始运行动画，如果当前没有启动过，则启动动画帧运动
   * 如果当前动画正在运行，则不改变当前状态
   * 如果当前是暂停状态，则继续运行动画而不是重新开始
   */
  start(): void;

  /**
   * 暂停动画
   */
  pause(): void;

  /**
   * 停止动画运行，并恢复到初始状态
   */
  stop(): void;

  /**
   * 注册一个操作，在游戏结束时调用
   * @param callback 回调函数
   */
  onStop(callback: Function): void;
}