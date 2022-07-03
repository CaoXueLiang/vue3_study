// 字符串字面量类型用来约束取值只能是某几个字符串中的一个。
// ❗注意, 类型别名与字符串字面量类型都是使用type进行定义。

type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: HTMLElement | null, event: EventNames) {}

handleEvent(document.getElementById("app"), "scroll");
// handleEvent(document.getElementById("app"), "dbclick");
