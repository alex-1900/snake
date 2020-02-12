/**
 * 容器对象
 * 用于对管理全局唯一的依赖项，也用于接管某些对象的创建过程
 */
export default interface ContainerInterface {
  /**
   * 通过名称获取一个内容
   * 
   * @param name 内容的索引名称
   * @reutrn entry
   */
  get<T = any>(name: string): T;

  /**
   * 保存一个内容到容器中去
   * 
   * @param name 内容的索引名称
   * @param entry 需要保存到容器中的内容
   */
  set(name: string, entry: any): void;

  /**
   * 检查指定的索引是否存在
   * 
   * @param name 内容的索引名称
   */
  has(name: string): Boolean;

  /**
   * 创建一个预先定义的对象，这个对象不会保存到容器中，所以并不是全局唯一
   * 
   * @param name 内容的索引名称
   * @param args 用于创建对象的参数列表
   */
  make<T = any>(name: string, ...args: Array<any>): T;

  /**
   * 添加一个内容当定义
   * 
   * @param name 内容的索引名称
   * @param definition 对于内容实例对定义，实质上是一个用于生成 entry 的函数
   */
  define(name: string, definition: Function): void;
}
