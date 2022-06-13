<template>
  <p>Current component: B</p>
  <span>Message is: {{ msg }}</span>
  <input v-model="msg" />
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";
const msg = ref("");

onActivated(() => {
  console.log("componentB activated");
});

onDeactivated(() => {
  console.log("componentB  deActivated");
});
</script>
