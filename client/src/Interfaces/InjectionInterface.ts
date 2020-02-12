/**
 * 调用或初始化一个对象，并返回函数的返回值，或类型实例
 * 此用能用于对函数和类依赖项的统一管理
 */
export default interface InjectionInterface {
  /**
   * 调用一个对象
   * 
   * @param callback 可调用对象
   * @param args 用于调用 callback 的信息列表
   * @return any
   */
  invoke(callback: Function, args: Array<string>): any;

  /**
   * 实例化一个类
   * 
   * @param className 需要实例化的类名称
   * @param args 用于类初始化的信息列表
   */
  instance(className: any, args: Array<string>): object;
}