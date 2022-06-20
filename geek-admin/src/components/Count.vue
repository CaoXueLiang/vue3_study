<template>
  <div>
    <button @click="add">add</button>
    <div>{{ count }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
let store = useStore();
let count = computed(() => {
  return store.state.count;
});
function add() {
  store.commit("add");
}
</script>

<style scoped></style>
