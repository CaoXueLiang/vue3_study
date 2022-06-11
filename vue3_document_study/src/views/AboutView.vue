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
    <MyComponent
      title="标题"
      :greetingMessage="greetingMessage"
      @increase="increase"
      @deIncrease="deIncrease"
    />
    <br />
    <ModelComponent v-model="inputValue" />
    <div>{{ inputValue }}</div>
    <br />
    <CustomeModelView v-model:title="customeInputValue" />
    <div>{{ customeInputValue }}</div>
    <br />
    <UserName v-model:firstName="firstName" v-model:lastName="lastName" />
    <div>{{ firstName }} --------- {{ lastName }}</div>
    <br />
    <MyButton class="large" @click="onParentClick" />
    <br />
    <br />
    <FancyButton>
      <div>我是外部传递的内容</div>
      <div>内容二</div>
      <div>{{ message }}</div>
    </FancyButton>
    <br />
    <br />
    <BaseLayout>
      <template v-slot:[dynamicSlotName]>
        <h1>Here might be a page title</h1>
      </template>
      <template v-slot:content>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>
      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </BaseLayout>
    <br />
    <br />
    <ScopeComponent>
      <template v-slot="slotProps">
        <div>{{ slotProps.text }}</div>
        <div>{{ slotProps.count }}</div>
      </template>
      <template v-slot:main="slotProps">
        <div>{{ slotProps }}</div>
      </template>
    </ScopeComponent>
    <br />
    <br />
    <CompositionView></CompositionView>
    <br />
    <br />
    <CustomDirective />
  </div>
</template>

<script setup>
import { reactive, ref, nextTick, onMounted } from "vue";
import computedView from "./components/ComputedView.vue";
import classBindView from "./components/ClassBindView.vue";
import conditionRenderView from "./components/ConditionRenderView.vue";
import listView from "./components/ListView.vue";
import ModelComponent from "./components/ModelComponent.vue";
import CustomeModelView from "./components/CustomeModeView.vue";
import UserName from "./components/UserName.vue";
import MyButton from "./components/MyButton.vue";
import FancyButton from "./myComponents/FancyButton.vue";
import BaseLayout from "./myComponents/BasseLayout.vue";
import ScopeComponent from "./myComponents/ScopeComponent.vue";
import CompositionView from "./ReusableComponents/compositionView.vue";
import CustomDirective from "./ReusableComponents/CustomDirective.vue";

const dynamicSlotName = ref("header");
const message = ref("FancyButton message");
const inputValue = ref("input value");
const customeInputValue = ref("自定义内容");
const firstName = ref("尤");
const lastName = ref("玉溪");
const greetingMessage = ref("我是欢迎语");
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

function increase(e) {
  alert(e);
}

function deIncrease(e) {
  alert(e);
}

function onParentClick() {
  console.log("onParentClick");
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

.large {
  font-family: "Courier New", Courier, monospace;
}
</style>
