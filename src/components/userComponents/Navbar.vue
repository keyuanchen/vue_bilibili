<template>
  <div class="navbar">
    <div class="navbar_left">
      <img src="@/assets/logo.png" @click="handleToHome" />
    </div>
    <div class="navbar_center">
      <p>
        请输入内容
        <van-icon class="search_btn" name="search" />
      </p>
    </div>
    <div class="navbar_right">
      <img :src="url" alt v-if="url" />
      <img src="@/assets/default_img.jpg" alt v-else />
      <span class="downapp">下载App</span>
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
  props: {
    url: {
      type: String
    }
  },
  methods: {
    handleToHome () {
      if (this.$router.currentRoute.fullPath !== '/') {
        this.$router.push('/')
      }
    }
  },
}
</script>
<style scoped lang='less'>
.navbar {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 999;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .navbar_left {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }

  .navbar_center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      width: 100%;
      height: 30px;
      position: relative;
      background-color: #eee;
      color: #666;
      border-radius: 10px;
      padding-left: 20px;
      display: flex;
      align-items: center;
      .search_btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 2px;
      }
    }
  }

  .navbar_right {
    width: 150px;
    display: flex;
    align-items: center;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }

    .downapp {
      background-color: #fb7299;
      color: #fff;
      font-weight: 600;
      margin-left: 10px;
      padding: 5px 15px;
    }
  }
}
</style>