<template>
  <div class="titleLabel">
    <div>{{ title }}</div>
    <div>{{ message }}</div>
    <div>{{ greetingMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  title: String,
  greetingMessage: String,
});
const message = ref("我是子组件内容");
</script>

<style scoped>
.titleLabel {
  font-size: 20px;
  color: #fff;
}
</style>
