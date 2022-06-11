<template>
  <div class="container">
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
  </div>
</template>

<script setup>
import useMouse from "../hooks/mouse.js";
const { x, y } = useMouse();
</script>

<style scoped>
.container {
  height: 300px;
  background: olivedrab;
  color: #fff;
}
</style>
