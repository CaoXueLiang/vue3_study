<template>
  <p>Current component: D</p>
  <span>Message is: {{ msg }}</span>
  <input v-model="msg" />
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";
const msg = ref("");
onActivated(() => {
  console.log("componentD activated");
});

onDeactivated(() => {
  console.log("componentD  deActivated");
});
</script>
