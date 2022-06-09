<template>
  <ul>
    <li v-for="(item, index) in tmpArray" :key="index">
      {{ item.message }} -- {{ index }}
    </li>
  </ul>
  <ul>
    <li v-for="(value, key, index) in myObject" :key="key">
      {{ key }} - {{ value }} - {{ index }}
    </li>
  </ul>
  <span v-for="n in tmpNumber" :key="n">-{{ n }}-</span>
</template>

<script setup>
//可以是：number, string, object, array
import { ref, reactive } from "vue";
const tmpArray = ref([
  { message: "kebe" },
  { message: "James" },
  { message: "XiaoMing" },
]);
const myObject = reactive({
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
});

const tmpNumber = ref(10);
</script>

<style scoped></style>
