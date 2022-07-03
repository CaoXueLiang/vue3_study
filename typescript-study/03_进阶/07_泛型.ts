// 泛型
// 泛型是指在定义函数，接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

// 1.简单使用
function createArray<T>(length: number, value: T): Array<T> {
  let result = [];
  for (let index = 0; index < length; index++) {
    result[index] = value;
  }
  return result;
}
createArray(3, "x");

// 2.多个类型参数
// 定义泛型的时候，可以一次定义多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, "seven"]);

// 3.泛型约束
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
function loggingIdentity<T>(arg: T): T {
  //   console.log(arg.length);
  return arg;
}

// 上例中，泛型T不一定包含属性length,所以编译的时候报错了。
// 这时，我们可以对泛型进行约束，只允许这个函数传入那些包含length属性的变量。这就是泛型约束。
interface LengthWise {
  length: number;
}
function logLength<T extends LengthWise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
logLength("hhhhhhh");

export {};
