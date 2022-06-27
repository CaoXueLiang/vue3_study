function sayHello(person) {
    return "hello" + person;
}
var user = "tom";
// TypeScript会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错
// 当赋值为非字符串类型时，Argument of type 'number[]' is not assignable to parameter of type 'string'.
// let user = [1, 2, 3];
console.log(sayHello(user));
