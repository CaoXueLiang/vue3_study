// 类型断言 （Type Assertion）可以用来手动指定一个值的类型。
// 建议在使用类型断言时，统一使用 `（值 as 类型）` 这样的语法。

/**
 * 类型断言的用途：
 * 1. 将一个联合类型断言为其中一个类型
 *    当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的多有类型中共有的属性和方法
 * 2. 将一个父类断言为更具体的子类。
 * 3. 将任何一个类型断言为any。（在any类型的变量上，访问任何属性都是允许的）
 * 4. 将 any 断言为一个具体的类型。
 * 5. 要使得A能够被断言为B，只需要A兼容B，或者B兼容A即可
 *
 */

// ❗需要注意的是，类型断言只能够欺骗 TypeScript编译器，无法避免运行时的错误
interface Cat {
  name: string;
  run(): void;
}

interface Fish {
  name: string;
  swim(): void;
}

function isFinsh(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}

// (window as any).foo = 1;

// 二. 双重断言
// 任何类型都可以被断言为any
// any可以被断言为任何类型
// 那么我们可以使用双重断言 as any as 来将任何一个类型断言为任何另一个类型
// ❗除非迫不得已，千万别用双重断言
interface Cat1 {
  run(): void;
}

interface Fish1 {
  swim(): void;
}

function testCat(cat: Cat1) {
  return cat as any as Fish1;
}

// 三. 类型断言 vs 类型转换
// 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除
// ❗类型断言不是类型转换，它不会真的影响到变量的类型
function toBoolean(something: any): boolean {
  return something as boolean;
}
console.log(toBoolean(1));

export {};
