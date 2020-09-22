<template>
  <div class="register_wrap">
    <login-top class="login_top" top-text="登录bilibili">
      <a href="javascript:;" class="to_login" @click="$router.push('/register')">跳转到注册</a>
    </login-top>
    <login-text
      @inputContent="val =>username=val"
      type="text"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      label="账号"
    ></login-text>
    <login-text
      @inputContent="val =>passsword=val"
      type="password"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      label="密码"
    ></login-text>
    <login-btn btn-text="登录" @btnSubmit="loginSubmit"></login-btn>
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
      username: '',
      passsword: ''
    }
  },
  methods: {
    async loginSubmit () {
      const reg = /^.{6,16}$/
      if (reg.test(this.username) && reg.test(this.passsword)) {
        const res = await this.$axios.post('/login', {
          username: this.username,
          passsword: this.passsword
        })
        console.log(res);
        return

        if (res.data.code === 200) {
          this.$toast.success(res.data.msg)
          this.$router.push('/userinfo')
          // 本地存储用户token和用户id
          localStorage.setItem('token', res.data.objtoken)
          localStorage.setItem('id', res.data.id)
        } else {
          this.$toast.fail(rea.data.msg)
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