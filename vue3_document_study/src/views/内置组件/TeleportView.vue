<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <Teleport to="body" :disabled="false">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
      <template v-slot:body>
        <h2>custom body</h2>
      </template>
    </modal>
  </Teleport>
</template>

<script setup>
import Modal from "./components/Model.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>

<style scoped>
h2 {
  color: blueviolet;
}
</style>
