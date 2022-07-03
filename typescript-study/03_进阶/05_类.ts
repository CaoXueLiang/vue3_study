/**
 * TypeScript中类的用法
 * public, private, protected
 * TypeScript可以使用三种访问修饰符，分别是public,private和protected
 * 1. public修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是public的
 * 2. private修饰的属性或方法是私有的，不能在声明它的类的外部访问
 * 3. protected修饰的属性或方法是受保护的，它和private类似，区别是它在子类中也是允许被访问的。
 *
 * ❗ 当构造函数修饰为 private 时，该类不允许被继承或者实例化
 * ❗ 当构造函数修饰为 protected 时该类只允许被继承
 */

import { extend } from "jquery";

class Animal {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
}

let animal1 = new Animal("Jack");
console.log(animal1.name);
animal1.name = "tom";
console.log(animal1.name);

class Animals {
  private name;
  public constructor(name: string) {
    this.name = name;
  }
}

// ❗需要注意的是：TypeScript编译之后的代码中，并没有限制private属性在外部的可访问性
let animal2 = new Animals("laoshu");
// animal2.name

// 2. 参数属性
// 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使得代码更简洁
// 如果readonly和其他访问修饰符同时存在的话，需要写在其后面

class Animals2 {
  // public name;
  constructor(public readonly name: string) {
    this.name = name;
  }
}

// 3. 抽象类
// abstract 用于定义抽象类和其中的抽象方法
// ❗1. 抽象类是不允许被实例化的
//    2. 抽象类中的抽象方法必须被子类实现

abstract class Animal3 {
  constructor(public name: string) {
    this.name = name;
  }
  public abstract sayHi(): void;
}

class Cat extends Animal3 {
  public sayHi() {
    console.log(`my name is ${this.name}`);
  }
}

let cats: Cat = new Cat("cat");
console.log(cats.sayHi());

export {};
