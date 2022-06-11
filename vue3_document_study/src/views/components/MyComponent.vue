<template>
  <div class="titleLabel">
    <div>{{ title }}</div>
    <div>{{ message }}</div>
    <div>{{ greetingMessage }}</div>
    <button @click="$emit('increase', 'increase -- message')">increase</button>
    <button @click="deIncreaseMethod">deIncrease</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  title: String,
  greetingMessage: String,
});
const emits = defineEmits(["deIncrease"]);
const message = ref("我是子组件内容");

function deIncreaseMethod() {
  emits("deIncrease", "deIncrease -- message");
}
</script>

<style scoped>
.titleLabel {
  font-size: 20px;
  color: #fff;
}
</style>
