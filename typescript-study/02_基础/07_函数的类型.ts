// 1.函数声明
// 一个函数有输入和输出，要在TypeScript中对其进行约束，需要把输入和输出都考虑到。
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 3);
export {};

// 2.函数表达式
// 注意不要混淆了TypeScript中 => 和ES6中的 =>。
// 在TypeScript的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
let mySum: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// 3.用接口定义函数的形状
// 采用函数表达式接口定义函数的方式时，对等号左边进行类型限制，可以保证以后对函数名赋值时保证参数个数，参数类型，返回值类型不变
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string): boolean {
  return source.search(subString) > -1;
};

// 4.可选参数
// 与接口中的可选属性类似，我们用？来表示可选的参数
// ❗注意：可选参数必须放在必选参数后面，换句话说，可选参数后面不允许再出现必选参数了
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return firstName + lastName;
  } else {
    return firstName;
  }
}

let tomcat = buildName("tom", "cat");
let tom = buildName("tom");

// 5.参数默认值
// 在ES6中，我们允许给函数的参数添加默认值，TypeScript会将添加了默认值的参数识别为可选参数
// 此时，就不受 【可选参数必须接在必选参数的后面】的限制了。
function buildName1(firstName: string, lastName: string = "cat") {
  return firstName + lastName;
}
let tom1 = buildName1("tom");

function buildName2(firstName: string = "tom", lastName: string) {
  return firstName + lastName;
}
let tom2 = buildName2(undefined, "cat");

// 6.剩余参数
// rest参数只能是最后一个参数
// ES6中，可以使用 ...rest 的方式获取函数中的剩余参数（rest参数）
// 事实上，items是一个数组。我们可以用数组的类型来定义它：
function push(array: any[], ...items: any[]) {
  items.forEach((item) => {
    array.push(item);
  });
}

let a: any[] = [];
push(a, 1, 2, 3, 4);
console.log("---a---", a);

// 7.重载
// 重载允许一个函数接收不同数量或类型的参数时，作不同的处理
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

console.log(reverse(123456));
console.log(reverse("hello world"));

// 上例中，我们重复定义了多次函数reverse,前几次都是函数定义，最后一次是函数实现。
// 在编辑器的代码提示中，可以正确的看到前两个提示。
// ❗注意：TypeScript会优先从最前面的函数定义开始匹配，所以多个函数定义如果是包含关系，需要优先把精确的定义写在前面

export {};
