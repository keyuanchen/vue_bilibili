<template>
  <div class="edit_container">
    <nav-bar class="edit_nav" :url="userinfo.user_img"></nav-bar>
    <div class="upload_avatar">
      <van-uploader preview-size="100vw" class="upload" :after-read="afterRead" />
      <edit-banner class="user_avatar" left="头像">
        <img :src="userinfo.user_img" alt v-if="userinfo.user_img" />
        <img src="@/assets/default_img.jpg" v-else alt />
      </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="isNickNameShow = true">
      <a href="javascropt:;">{{userinfo.name}}</a>
    </edit-banner>
    <edit-banner left="UID">
      <a href="javascropt:;">{{userinfo.id}}</a>
    </edit-banner>
    <edit-banner @bannerClick="isGenderShow = true" left="性别">
      <a href="javascropt:;">{{userinfo.gender == 1 ? '男' : '女'}}</a>
    </edit-banner>
    <edit-banner left="个签" @bannerClick="isUserDescShow = true"></edit-banner>
    <van-dialog
      @confirm="handleConfirmNickName"
      @cancel="content = ''"
      v-model="isNickNameShow"
      title="昵称"
      show-cancel-button
    >
      <van-field v-model="content" autofocus placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog
      @confirm="handleConfirmUserDesc"
      @cancel="content = ''"
      v-model="isUserDescShow"
      title="个签"
      show-cancel-button
    >
      <van-field v-model="content" autofocus placeholder="请输入个签" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-action-sheet
      v-model="isGenderShow"
      cancel-text="取消"
      :actions="actions"
      @select="onSelect"
    />
    <!-- 用户返回 -->
    <div class="back_wrap" @click="$router.back()">
      <div class="back_btn">返回用户中心</div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/userComponents/Navbar'
import EditBanner from '@/components/userComponents/EditBanner'

export default {
  name: '',
  components: {
    NavBar,
    EditBanner
  },
  data () {
    return {
      userinfo: {},
      content: '',
      isNickNameShow: false,
      isUserDescShow: false,
      isGenderShow: false,
      actions: [{ name: '男', val: 1 }, { name: '女', val: 0 }],
    }
  },
  created () {
    this.getUserinfo()
  },
  methods: {
    async getUserinfo () {
      if (localStorage.getItem('token')) {
        const res = await this.$axios.get('/user/' + localStorage.getItem('id'))
        console.log(res);
        this.userinfo = res.data[0]
      }
    },
    async afterRead (file) {
      console.log(file);
      const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd)
      console.log(res);
      // 修改头像图片
      this.userinfo.user_img = res.data.url
      this.updateUser()
    },
    async updateUser () {
      const res = await this.$axios.post('/update/' + localStorage.getItem('id'), this.userinfo)
      console.log(res);
    },
    // 确认修改昵称
    handleConfirmNickName () {
      this.userinfo.name = this.content
      // 更新后台数据
      this.updateUser()
      this.content = ''
    },
    // 确认修改个签
    handleConfirmUserDesc () {
      this.userinfo.user_desc = this.content
      this.updateUser()
      this.content = ''
    },
    // 选择性别
    onSelect (item) {
      this.userinfo.gender = item.val
      this.updateUser()
      this.isGenderShow = false
    }
  },
}
</script>
<style scoped lang='less'>
.edit_container {
  .edit_nav {
    margin-bottom: 10px;
  }
  a {
    color: #aaa;
  }
  .upload_avatar {
    position: relative;
    overflow: hidden;
    .upload {
      position: absolute;
      opacity: 0;
    }
    .user_avatar {
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
  }
}
.back_wrap {
  margin-top: 10px;
  background-color: #fb7299;
  border: 1px solid #fb7299;
  border-radius: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>