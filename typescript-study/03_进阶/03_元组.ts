// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

let tom: [string, number] = ["tom", 23];

let James: [string, number];
James = ["james", 35];

// 当添加越界元素时，它的类型会被限制为元组中每个类型的联合类型 （string | number）
James.push("male");
console.log(James);
