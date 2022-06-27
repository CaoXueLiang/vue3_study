// 对象的类型
// 在TypeScript中，我们使用接口（Interfaces）来定义对象的类型。
// 接口一般首字母大写

// 1.赋值的时候，变量的形状必须和接口的形状保持一致。多一些属性和少一些属性都是不允许的
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 18,
};

// 2.可选属性 (当我们希望定义的变量和接口不完全一致时，可以使用可选属性。但仍然不允许添加未定义的属性)
interface Person1 {
  name: string;
  age?: number;
}

let tom1: Person1 = {
  name: "tom1",
};

// 3.任意属性 (一个接口允许有任意属性)
interface Person2 {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom2: Person2 = {
  name: "tom2",
  gender: "male",
  friends: ["xiaoming", "lining"],
};

// ❗警告: 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
// 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型。
interface Person3 {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

// 4.只读属性
// 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性。
