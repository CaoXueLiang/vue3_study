<template>
  <div>
    <button @click="toggle">
      {{ isFullscreen ? "退出全屏" : "切换全屏" }}
    </button>
  </div>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, enter, exit, toggle } = useFullscreen();
</script>

<style scoped></style>
