<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
  <div>
    <div>x: {{ x }}</div>
    <div>y: {{ y }}</div>
  </div>
</template>

<script setup>
import { useTodos } from "./hooks/useTodos";
import { useMouse } from "../utils/useMouse";
let { title, todos, addTodo, clear, active, all, allDone } = useTodos();
let { x, y } = useMouse();
</script>

<style scoped>
.done {
  color: lightgray;
  text-decoration-line: line-through;
}
</style>
