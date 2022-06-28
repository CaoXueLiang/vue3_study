/**
declare var //声明全局变量
declare function //声明全局方法
declare class //声明全局类
declare enum //声明全局枚举类型
declare namespace //声明（含有子属性的）全局对象
interface 和 type //声明全局类型
export //导出变量
export namespace // 导出（含有子属性的）对象
export default //ES6默认导出
export = //commonjs导出模块
export as namespace // UMD库声明全局变量
declare global //扩展全局变量
declare module //扩展模块
/// <reference /> // 三斜线指令
 */

// 一. 什么是声明文件
// 通常，我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
// 声明文件必须以 `.d.ts` 为后缀

//声明类
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): void;
}

//声明枚举。Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}

export {};
