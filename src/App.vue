<template>
  <div id="app">
    <!-- <keep-alive :include="['Home']">
      <router-view />
    </keep-alive>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepalive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive" />
  </div>
</template>

<style lang="less">
@import "~@/styles/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
#app {
  padding-top: 50px;
  background-color: #eee;
  width: 100vw;
  height: 100vh;
}
</style>
