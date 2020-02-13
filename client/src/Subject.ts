import SubjectInterface from "./Interfaces/SubjectInterface";
import ObserverInterface from "./Interfaces/ObserverInterface";

export default class Subject implements SubjectInterface {

  private observers = new Set<ObserverInterface>();

  /**
   * 注册一个 observer
   * 
   * @param observer observer（观察者）对象
   */
  register(observer: ObserverInterface): void {
    this.observers.add(observer);
  }

  /**
   * 移除一个 observer，并将其销毁，同时清除渲染的图像
   * 
   * @param observer observer（观察者）对象
   */
  remove(observer: ObserverInterface): void {
    if (observer.terminate) {
      observer.terminate();
    }
    this.observers.delete(observer);
  }

  /**
   * 接受外部通知（这里是动画刷新的时间戳）。并负责将通知转发给每一个 observer
   * 
   * @param timestamp 时间戳
   */
  notify(timestamp: number): void {
    this.observers.forEach(observer => {
      if (observer.update) {
        observer.update(timestamp);
      }
      if (observer.render && observer.needRepaint()) {
        observer.render();
        observer.repaint(false);
      }
    });
  }

  /**
   * 终止所有 observer，同时清除渲染的图像，将状态恢复到初始化
   */
  terminate(): void {
    this.observers.forEach(observer => {
      if (observer.terminate) {
        observer.terminate();
      }
    });
    this.observers.clear();
  }
}
