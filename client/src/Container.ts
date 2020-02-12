import ContainerInterface from "./Interfaces/ContainerInterface";
import InjectionInterface from "./Interfaces/InjectionInterface";
import { Instantiable } from "./Types/BaseTypes";

export default class Container implements ContainerInterface, InjectionInterface
{
  private definitions: {[key: string]: Function} = {};

  public constructor(
    private entries: {[key: string]: any} = {},
    definitions: {[key: string]: Function} = {},
  ) {
    this.entries.container = this;
    for (const key in definitions) {
      this.define(key, definitions[key]);
    }
  }

  /**
   * 通过名称获取一个内容
   * 
   * @param name 内容的索引名称
   * @reutrn entry
   * 
   * @throws {Error} 当找不到内容时抛出错误
   */
  public get<T = any>(name: string): T {
    const entry = this.entries[name];
    if (entry) {
      return entry;
    }

    const definition: Function = this.definitions[name];
    if (definition) {
      this.entries[name] = definition.apply(this);
      return this.entries[name];
    }
    
    throw new Error(`There is no entry named ${name}`);
  }

  /**
   * 保存一个内容到容器中去
   * 
   * @param name 内容的索引名称
   * @param entry 需要保存到容器中的内容
   * @internal
   */
  public set(name: string, entry: any): void {
    this.entries[name] = entry;
  }

  /**
   * 检查指定的索引是否存在
   * 
   * @param name 内容的索引名称
   */
  public has(name: string): Boolean {
    return Boolean(
      undefined === this.entries[name] &&
      undefined === this.definitions[name]
    );
  }

  /**
   * 创建一个预先定义的对象，这个对象不会保存到容器中，所以并不是全局唯一
   * 
   * @param name 内容的索引名称
   * @param args 用于创建对象的参数列表
   */
  public make<T = any>(name: string, ...args: Array<any>): T {
    const definition: Function = this.definitions[name];
    if (definition) {
      return definition.apply(this, args);
    }
    throw new Error(`There is no entry named ${name}`);
  }

  /**
   * 添加一个内容当定义
   * 
   * @param name 内容的索引名称
   * @param definition 对于内容实例对定义，实质上是一个用于生成 entry 的函数
   */
  public define(name: string, definition: Function): void {
    this.definitions[name] = definition.bind(this);
  }

  /**
   * 调用一个对象
   * 
   * @param callback 可调用对象
   * @param args 用于调用 callback 的信息列表
   * @return any
   */
  public invoke(callback: Function, args: Array<string>): any
  {
    const params: any[] = [];
    for (const argName of args) {
      params.push(this.get(argName));
    }
    return callback.apply(params);
  }

  /**
   * 实例化一个类
   * 
   * @param className 需要实例化的类名称
   * @param args 用于类初始化的信息列表
   */
  public instance(className: Instantiable, args: Array<string> = []): object
  {
    const params: any[] = [];
    for (const argName of args) {
      params.push(this.get(argName));
    }
    return new className(...params);
  }
}
