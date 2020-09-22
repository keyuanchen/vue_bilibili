<template>
  <div class="login_top">
    <div class="top_left"></div>
    <div class="top_center">{{topText}}</div>
    <div class="top_right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    topText: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {},
}
</script>
<style scoped lang='less'>
.login_top {
  padding: 0 10px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff;
  .top_left {
    flex: 1;
  }
  .top_center {
    flex: 1;
  }

  .top_right {
    flex: 1;
    text-align: right;
  }
}
</style>