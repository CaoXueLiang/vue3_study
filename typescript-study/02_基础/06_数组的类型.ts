// 1.类型加方括号表示法；`类型[]`
let fibNuber: number[] = [1, 2, 3, 4, 5];
// 数组中不允许出现其他类型
let fibNumber1: number[] = [1, "2", 3, 4, 5];
fibNumber1.push("10");

// 2.数组泛型
// 我们也可以使用数组泛型（Array Generic）Array<elemType>来表示数组：
let fibNumber2: Array<number> = [1, 2, 3, 4, 5];

// 3.用接口表示数组
// 下面表示索引的类型是数字，值的类型是string
// 虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了
interface NumberArray {
  [index: number]: string;
}
let fibNumber3: NumberArray = ["xiaoming", "lining", "tom"];

// 4.类数组
// 类数组不是数组类型，比如 arguments
// arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口
// 事实上我们常用的类数组都有自己的接口定义，比如：IArguments,NodeList,HTMLCollection等
function sum() {
  let args: number[] = arguments;
}

function sum1() {
  let ags: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

function sum2() {
  let args: IArguments = arguments;
}

// 5.any在数组中的应用
// 用any表示数组中允许出现任意类型
let list: any[] = ["xiaoming", 111, { website: "http:www.baidu.com" }];

/**
 * 总结：数组的类型
 * 1.【类型+[]】表示
 * 2. 数组泛型 Array<number>
 * 3. 接口表述数组
 * 4. 类数组 IArgument,NodeList,HTMLCollection等
 */

export {};
