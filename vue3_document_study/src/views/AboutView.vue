<template>
  <div class="about">
    <button @click="increment">增加数字</button>
    <div id="tmpID">{{ state.count }}</div>
    <button @click="addMethod">改变数字</button>
    <div>{{ counter }}</div>
    <button @click="change">改变</button>
    <div>{{ foo }}</div>
    <div>{{ bar }}</div>
    <br />
    <computedView />
    <br />
    <classBindView class="classBindComponent" />
    <br />
    <conditionRenderView />
    <br />
    <listView />
    <br />
    <MyComponent />
  </div>
</template>

<script setup>
import { reactive, ref, nextTick, onMounted } from "vue";
import computedView from "./components/ComputedView.vue";
import classBindView from "./components/ClassBindView.vue";
import conditionRenderView from "./components/ConditionRenderView.vue";
import listView from "./components/ListView.vue";

const raw = { count: 0 };
const state = reactive(raw);
const counter = ref(0);
const obj = {
  foo: ref(1),
  bar: ref(2),
};
const { foo, bar } = obj;

onMounted(() => {
  equalMethod();
});

function increment() {
  state.count++;
  console.log("===normal====", document.getElementById("tmpID").outerHTML);
  nextTick(() => {
    console.log("===nextTick====", document.getElementById("tmpID").outerHTML);
  });
}

function addMethod() {
  counter.value++;
}

function change() {
  foo.value++;
  bar.value++;
}

function equalMethod() {
  const state1 = reactive(state);
  const state2 = reactive(raw);
  console.log(state === state1);
  console.log(state === state2);
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    padding: 40px;
  }
}

.classBindComponent {
  overflow: hidden;
}
</style>
