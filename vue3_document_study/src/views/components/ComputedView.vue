<template>
  <div>
    <p>
      Has published books:
      <span
        :class="publishedBooksMessage === 'YES' ? 'greenLabel' : 'redLabel'"
        >{{ publishedBooksMessage }}</span
      >
    </p>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "YES" : "NO";
});
console.log(publishedBooksMessage);
</script>

<style scoped>
.greenLabel {
  color: green;
}

.redLabel {
  color: red;
}
</style>
