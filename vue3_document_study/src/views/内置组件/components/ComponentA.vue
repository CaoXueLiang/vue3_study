<template>
  <p>Current component: A</p>
  <span>count: {{ count }}</span>
  <button @click="count++">+</button>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";

const count = ref(0);
onActivated(() => {
  console.log("componentA activated");
});

onDeactivated(() => {
  console.log("componentA  deActivated");
});
</script>
