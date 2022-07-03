// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有7天，颜色限定为红绿蓝等。

enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
// 枚举成员会被赋值为从0开始递增的数字，同时也会对枚举值到枚举名进行反向映射。
console.log(Days[2] === "Tue");
console.log(Days[6] === "Sat");
console.log(Days["Sat"] === 6);
console.log(Days["Tue"] === 2);

// 二. 手动赋值
// 未手动赋值的枚举项会接着上一个枚举项递增
// 手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为`1`
// ❗如果未手动赋值的枚举项与手动赋值的重复了，TypeScript是不会察觉到这一点的
enum Dayss {
  Sun = 7,
  Mon,
  Tue = 4,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Dayss);

// 三. 常用项和计算所得项
// 枚举项有两种类型：常用项 和 计算所得项
enum Color {
  Red,
  Green,
  Blue = "blue".length,
}

// `blue.length` 就是一个计算所得项
// ❗如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
// enum Colors {
//   Red,
//   Blue = "blue".length,
//   Green,
// }

// 四. 常数枚举
// 常数枚举是是使用 `const enum` 定义的枚举类型
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];

// 五. 外部枚举
// 是使用 `declare enum` 定义的枚举类型
// declare 定义的类型只会用于编译时的检查，编译结果中会会被删除
declare enum Directionss {
  Up,
  Down,
  Left,
  Right,
}

let directions1 = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];

// 同时使用declare和const也是可以的
export {};
