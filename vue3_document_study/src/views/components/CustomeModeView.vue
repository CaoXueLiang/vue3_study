<template>
  <div>
    <input type="text" v-model="inputValue" />
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["title"]);
const emit = defineEmits(["update:title"]);
const inputValue = computed({
  set(value) {
    emit("update:title", value);
  },
  get() {
    return props.title;
  },
});
</script>

<style scoped></style>
