<template>
  <div class="componentClass">
    <div class="static" :class="{ active: isActive, 'text-danger': hasError }">
      class 与 style 的绑定
    </div>
    <div :class="classObj">class绑定对象</div>
    <div :style="{ color: labelColor, fontSize: labelFont + 'px' }">
      绑定style
    </div>
    <div :style="styleObj">style绑定对象</div>
    <button @click="changeState">改变状态</button>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
const isActive = ref(true);
const hasError = ref(false);

const classObj = computed(() => {
  return {
    active: isActive.value,
    "text-danger": hasError.value,
  };
});

const labelColor = ref("red");
const labelFont = ref(20);

const styleObj = reactive({
  color: "red",
  fontSize: "25px",
});

function changeState() {
  isActive.value = !isActive.value;
  hasError.value = !hasError.value;
  styleObj.color = "yellow";
  labelColor.value = "blue";
}
</script>

<style scoped>
.static {
  font-weight: bold;
}

.active {
  color: aqua;
}

.text-danger {
  color: red;
}

.componentClass {
  color: yellow;
}
</style>
