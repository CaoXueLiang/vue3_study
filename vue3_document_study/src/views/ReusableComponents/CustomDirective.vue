<template>
  <div>
    <input type="text" v-focus />
    <br />
    <br />
    <button @click="isShow = !isShow">显示/隐藏</button>
    <span v-my-directive:foo.bar="payload" v-if="isShow">
      custom directive</span
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
const isShow = ref(true);
const payload = ref({ firstName: "li", lastName: "xiaoMing" });
const vFocus = {
  mounted(el) {
    el.focus();
  },
};
const vMyDirective = {
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted(el, binding, vnode, preVnode) {
    console.log("mounted");
    console.log({ el, binding, vnode, preVnode });
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
};
</script>

<style scoped></style>
