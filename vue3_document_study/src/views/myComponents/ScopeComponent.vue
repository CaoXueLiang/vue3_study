<template>
  <div class="colorWhite">
    <div>作用域插槽</div>
    <slot :text="greetingMessage" :count="1">default content</slot>
    <div class="scopedMain">
      <slot name="main" :message="slotMessage">default main content</slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const greetingMessage = ref("greeting mesaage content");
const slotMessage = ref("具名作用域插槽");
</script>

<style scoped>
.colorWhite {
  color: #fff;
}

.scopedMain {
  height: 200px;
  background: goldenrod;
}
</style>
