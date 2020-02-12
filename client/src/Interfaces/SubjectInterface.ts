import ObserverInterface from "./ObserverInterface";

/**
 * 针对于动画刷新被观察者接口
 */
export default interface SubjectInterface
{
  /**
   * 注册一个 observer
   * 
   * @param observer observer（观察者）对象
   */
  register(observer: ObserverInterface): void;

  /**
   * 移除一个 observer，并将其销毁，同时清除渲染的图像
   * 
   * @param observer observer（观察者）对象
   */
  remove(observer: ObserverInterface): void;

  /**
   * 接受外部通知（这里是动画刷新的时间戳）。并负责将通知转发给每一个 observer
   * 
   * @param timestamp 时间戳
   */
  notify(timestamp: number): void;

  /**
   * 终止所有 observer，同时清除渲染的图像，将状态恢复到初始化
   */
  terminate(): void;
}