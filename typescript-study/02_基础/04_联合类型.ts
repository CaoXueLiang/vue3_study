// 联合类型
// 联合类型（Union Types）表示取值可以为多种类型中的一种。

let favoriteNumber1: string | number;
favoriteNumber1 = "seven";
favoriteNumber1 = 7;

// 访问联合类型的属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

function getLength(something: string | number): number {
  return something.length;
}

// 上例中，length不是string和number的共有属性，所以会报错。
// 访问 string 和 number 的共有属性是没有问题的。

function getString(something: string | number): string {
  return something.toString();
}

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let favariteNumber2: string | number;
favariteNumber2 = "seven";
favariteNumber2 = 7;
