const elementVnode = {
  tag: "div",
  props: {},
  children: [
    {
      tag: "span",
      props: {
        onclick() {
          alert("span on click");
        },
        onmouseenter(e) {
          console.log("onmouseenter", e);
        },
        onmouseleave(e) {
          console.log("onmouseleave", e);
        },
        title: "我是span",
        id: "spanID",
        style: { color: "blue", "font-size": "20px", "font-weight": "800" },
      },
      children: "span label",
    },
    {
      tag: "div",
      props: {
        id: "divID",
        class: "",
        title: "我是div",
        onclick() {
          alert("div on click");
        },
      },
      children: "div label",
    },
  ],
};

export { elementVnode };
