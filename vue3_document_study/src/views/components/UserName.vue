<template>
  <div>
    <input type="text" :value="firstName" @input="firstInputChange" />
    <input type="text" :value="lastName" @input="lastInputChange" />
  </div>
</template>

<script setup>
defineProps({
  firstName: String,
  lastName: String,
});
const emit = defineEmits(["update:firstName", "update:lastName"]);
function firstInputChange(e) {
  emit("update:firstName", e.target.value);
}
function lastInputChange(e) {
  emit("update:lastName", e.target.value);
}
</script>

<style scoped></style>
