const MyComponent = {
  render() {
    return {
      tag: "div",
      props: {
        onclick: () => alert("function component"),
      },
      children: [
        {
          tag: "span",
          props: { style: { color: "orange", "font-size": "25px" } },
          children: "标题",
        },
        {
          tag: "div",
          props: {
            id: "single-div-id",
            style: { color: "#999", "font-size": "20px" },
          },
          children: "详情描述",
        },
      ],
    };
  },
};

const objComponentVnode = {
  tag: MyComponent,
};

export { objComponentVnode };
