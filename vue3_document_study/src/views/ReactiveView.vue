<template>
  <div>
    <button @click="buttonClick">trigger</button>
    <div>{{ count }}</div>
  </div>
</template>

<script setup>
import { ref, toRef, toRefs, reactive, watch, watchEffect } from "vue";
const count = ref(1);
const state = reactive({
  foo: 1,
  bar: 2,
});

// toRef：
// 可用于为响应式对象上的 property 创建ref，这样创建的ref与其源property保持同步；改变源property将更新ref,反之亦然。
const fooRef = toRef(state, "foo");

// 更改该 ref 会更新源属性
fooRef.value++;
console.log(state.foo);

// 更改源属性也会更新该 ref
state.foo++;
console.log(fooRef.value);

function buttonClick() {
  count.value++;
}

// 立即运行一个函数，同时响应式的追踪其依赖，并在依赖更改时重新执行
const stopEffect = watchEffect(() => {
  console.log("----watchEffect----", count.value);
  if (count.value === 3) {
    stopEffect();
  }
});

// 接收三个参数：watch(sources,callback,options)
watch(
  count,
  (newValue, oldValue, clearUp) => {
    console.log("newValue", newValue, "oldValue", oldValue);
  },
  {
    immediate: true,
    deep: true,
    flush: "post",
    onTrack(e) {},
    onTrigger(e) {},
  }
);
</script>

<style scoped></style>
