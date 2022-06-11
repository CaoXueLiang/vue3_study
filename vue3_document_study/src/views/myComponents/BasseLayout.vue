<template>
  <div class="colorWhite">
    <div class="header">
      <slot name="header">header</slot>
    </div>
    <div class="content">
      <slot name="content">content</slot>
    </div>
    <div class="footer">
      <slot name="footer">footer</slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.colorWhite {
  color: #fff;
}
.header {
  height: 40px;
  background: gray;
}

.content {
  height: 300px;
  background: orange;
}

.footer {
  height: 80px;
  background: green;
}
</style>
