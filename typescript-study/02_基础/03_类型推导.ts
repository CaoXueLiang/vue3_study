// 类型推论
// 如果没有明确的指定类型，那么TypeScript会依照类型推论（Type Inference）的规则推断出一个类型。

// 以下代码虽然没有指点类型，但是会在编译的时候报错：
let favoriteNumber = "seven";
favoriteNumber = 7;

// 事实上，它等价于：

// let favariteNumber:string = 'seven';
// favariteNumber = 7;

/**
 * TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
 * 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被类型检查。
 */
