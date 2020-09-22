<template>
  <div class="userinfo">
    <navbar :url="model.user_img"></navbar>
    <user-detail></user-detail>
  </div>
</template>

<script>
import Navbar from '@/components/userComponents/Navbar'
import UserDetail from '@/components/userComponents/UserDetail'

export default {
  name: '',
  components: {
    Navbar,
    UserDetail
  },
  data () {
    return {
      model: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const res = await this.$axios.get('/user/' + localStorage.getItem('id'))
      console.log(res);
      this.model = res.data[0]
    }
  },
}
</script>
<style scoped lang='less'>
.userinfo {
  background-color: #fff;
}
</style>