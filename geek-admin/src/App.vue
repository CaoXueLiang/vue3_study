<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <div>
          <router-link to="/">Home</router-link>
        </div>
        <div>
          <router-link to="/about">About</router-link>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
