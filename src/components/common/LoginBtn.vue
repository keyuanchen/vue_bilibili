<template>
  <div class="login_btn">
    <div class="btn_wrap" @click="btnSubmit">
      <div class="btn_submit">{{btnText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props: ['btnText'],
  methods: {
    btnSubmit() {
      this.$emit('btnSubmit')
    }
  },
}
</script>
<style scoped lang='less'>
.login_btn {
  margin-top: 10px;
  .btn_wrap {
    color: #fff;
    background-color: #fb7299;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 25px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>