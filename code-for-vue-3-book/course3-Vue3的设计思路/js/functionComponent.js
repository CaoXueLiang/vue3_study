const MyComponent = function () {
  return {
    tag: "div",
    props: {
      onclick: () => alert("function component"),
    },
    children: [
      {
        tag: "span",
        props: { style: { color: "green", "font-size": "25px" } },
        children: "标题",
      },
      {
        tag: "div",
        props: { id: "single-div-id", style: { color: "#666" } },
        children: "详情描述",
      },
    ],
  };
};

const functionComponentVnode = {
  tag: MyComponent,
};

export { functionComponentVnode };

//❗组件的本质：就是一组虚拟DOM的封装
