<template>
  <button class="btn" @click="onChildClick">click me {{ $attrs }}</button>
</template>

<script setup>
function onChildClick() {
  console.log("onChildClicked");
}
</script>

<style scoped>
.btn {
  color: orangered;
  font-weight: bold;
  font-size: 20px;
}
</style>
