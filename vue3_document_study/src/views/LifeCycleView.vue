<template>
  <div>
    <div>
      <span ref="spanRef">生命周期</span>
    </div>
    <button id="count" @click="count++">{{ count }}</button>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  inject,
} from "vue";

const spanRef = ref();
const count = ref(0);
const injectValue = inject("provideMessage");
console.log("=======injectValue====", injectValue);

onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted", spanRef.value);
});
onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
onUpdated(() => {
  console.log("onUpdated");
  //console.log(document.getElementById("count").textContent);
});
onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
});
onUnmounted(() => {
  console.log("onUnmounted");
});
onActivated(() => {
  console.log("onActivated");
});
onDeactivated(() => {
  console.log("onDeactivated");
});
</script>

<style scoped></style>
