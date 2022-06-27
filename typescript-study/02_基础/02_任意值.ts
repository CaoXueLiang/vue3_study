// 任意值（Any）用来表示允许赋值为任意类型。
// 如果是any类型，则允许被赋值为任意类型
let myFavoriteNumber: any = "seven";
myFavoriteNumber = 7;

// 未声明类型的变量
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

// let something;
// something = "seven";
// something = 7;
// something.setName("tom");

//等价于

let something: any;
something = "seven";
something = 7;
something.setName("tom");
