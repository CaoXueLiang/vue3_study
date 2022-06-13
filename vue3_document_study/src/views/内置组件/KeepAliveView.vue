<template>
  <div class="demo">
    <label
      ><input type="radio" v-model="current" :value="ComponentA" /> A</label
    >
    <label
      ><input type="radio" v-model="current" :value="ComponentB" /> B</label
    >
    <label
      ><input type="radio" v-model="current" :value="ComponentD" /> D</label
    >
    <KeepAlive :include="includes">
      <component :is="current"></component>
    </KeepAlive>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ComponentA from "./components/ComponentA.vue";
import ComponentB from "./components/ComponentB.vue";
import ComponentD from "./components/ComponentD.vue";

const current = ref(ComponentA);
const includes = ref(["ComponentA", "ComponentB"]);
console.log("current", current);
</script>

<style scoped>
label {
  margin-left: 15px;
}
</style>
