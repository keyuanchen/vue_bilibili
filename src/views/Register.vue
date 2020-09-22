<template>
  <div class="register_wrap">
    <login-top class="login_top" top-text="注册bilibili">
      <a href="javascript:;" class="to_login" @click="$router.push('/login')">跳转到登录</a>
    </login-top>
    <login-text
      @inputContent="val => name=val"
      class="register_name"
      type="text"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      label="姓名"
    ></login-text>
    <login-text
      @inputContent="val =>username=val"
      type="text"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      label="账号"
    ></login-text>
    <login-text
      @inputContent="val => password=val"
      type="password"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      label="密码"
    ></login-text>
    <login-btn btn-text="注册" @btnSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue'
import LoginText from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'

export default {
  name: '',
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  data () {
    return {
      name: '',
      password: '',
      username: ''
    }
  },
  methods: {
    // inputContent (val) {
    //   console.log(val);
    // }
    // 点击注册按钮
    async registerSubmit () {
      const reg = /^.{6,16}$/
      if (reg.test(this.username) && reg.test(this.name) && reg.test(this.password)) {
        // 发送请求注册
        try {
          const res = await this.$axios.post('/register', {
            name: this.name,
            username: this.username,
            password: this.password
          })
          // console.log(res);
          if(res.data.code === 200) {
            this.$toast.success(res.data.msg)
            // 本地存储用户token和用户id
            localStorage.setItem('token', res.data.objtoken)
            localStorage.setItem('id', res.data.id)
          } else {
            this.$toast.fail(res.data.msg)
          }
          // 跳转到用户信息页
          this.$router.push('/userinfo')
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
}
</script>
<style scoped lang='less'>
.register_wrap {
  .login_top {
    margin-bottom: 10px;
    .to_login {
      color: red;
      font-size: 12px;
    }
  }
  .register_name {
    margin-bottom: 10px;
  }
}
</style>