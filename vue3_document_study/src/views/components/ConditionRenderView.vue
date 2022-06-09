<template>
  <div>
    <button @click="awesome = !awesome">Toggle</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
  </div>

  <button @click="switchMethod">switch</button>
  <template v-if="isShow">
    <div>template 中的内容</div>
    <div>内容的详情</div>
  </template>
</template>

<script setup>
import { ref } from "vue";
const awesome = ref(true);
const isShow = ref(true);
function switchMethod() {
  isShow.value = !isShow.value;
}
</script>

<style scoped></style>
