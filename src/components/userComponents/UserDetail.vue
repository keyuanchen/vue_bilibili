<template>
  <div class="user_detail">
    <div class="bg_img">
      <img src="@/assets/bannerTop_new.png" alt />
    </div>
    <user-banner></user-banner>
  </div>
</template>

<script>
import UserBanner from '@/components/userComponents/UserBanner'

export default {
  name: '',
  components: {
    UserBanner
  },
  data () {
    return {
    }
  },
  methods: {},
}
</script>
<style scoped lang='less'>
.user_detail {
  .bg_img {
    img {
      width: 100vw;
      height: 100px;
    }
  }
}
</style>