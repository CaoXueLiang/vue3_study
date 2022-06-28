// boolean, string, number, null, undefined, void

// 1.boolean值
let isDone: boolean = false;
// 使用构造函数创建的对象不是布尔值，使用 new Boolean() 返回的是一个 Boolean对象
// let createByNewBoolean: boolean = new Boolean(false);
let createByNewBoolean: Boolean = new Boolean(1);
let createByBoolean: boolean = Boolean(1);

// 2.数值
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
let fuinfinityNumber: number = -Infinity;

// 3.字符串
let myName: string = "Tom";
let myAge: number = 25;
let sentence: string = `Hello, my name is ${myName}, my age is ${myAge}`;

// 4.空值
// JavaScript 没有空值（Void）的概念，在TypeScript中，可以用void表示没有任何返回值的函数
function alertName(): void {
  alert("my name is Tom");
}
// 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为`undefined`和`null`
let unused: void = undefined;

// 5.null 和 undefined
let paramNull: null = null;
let paramUndefined: undefined = undefined;

// 与void的区别是，undefined 和 null 是所有类型的子类型。
// 也就是说 undefined 类型的变量，可以赋值给number类型的变量
// let num: number = undefined;
// let str: string = null;
// let tmp: boolean = undefined;
let noVoid: void = undefined;
