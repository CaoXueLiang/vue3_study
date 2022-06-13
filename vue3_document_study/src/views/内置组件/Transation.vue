<template>
  <div>
    <div>
      <button @click="show = !show">Toggle</button>
      <Transition>
        <p v-if="show">hello world</p>
      </Transition>
    </div>

    <button @click="show = !show">切换</button>
    <Transition name="fade">
      <div v-if="show">
        <div>标题</div>
        <div>
          我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情
        </div>
      </div>
    </Transition>

    <!-- 假设你已经在页面中引入了 Animate.css -->
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__lightSpeedOutLeft"
    >
      <p class="boldTitle" v-if="show">Animate.css</p>
    </Transition>
  </div>
</template>

<script setup>
import "animate.css";
import { ref } from "vue";
const show = ref(true);
</script>

<style scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active {
  transition: opacity 1s ease;
}

.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}

p {
  color: #fff;
  font-size: 19px;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 3s ease-in;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 3s ease-in;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.boldTitle {
  font-size: 30px !important;
  font-weight: bold;
  color: #fff;
}
</style>
