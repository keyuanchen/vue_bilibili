<template>
  <div class="home">
    <nav-bar class="home_nav" :url="user && user.user_img"></nav-bar>
    <van-tabs v-model="active" sticky class="tab_menu" v-if="cates.length">
      <van-icon class="home_edit_btn" name="wap-nav" @click="$router.push('/edit-category')" />
      <van-tab v-for="item in cates" :key="item._id" :title="item.title">
        <van-list
          offset="20"
          :immediate-check="false"
          v-model="cateItem.loading"
          :finished="cateItem.finished"
          finished-text="我是有底线的~"
          @load="onLoad"
        >
          <div class="cover_wrap">
            <cover
              @pushArticle="$router.push(`/article/${item.id}`)"
              class="cover_item"
              :article="item"
              v-for="(item, index) in cateItem.list"
              :key="index"
            ></cover>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/userComponents/Navbar'
import Cover from './Cover'

export default {
  name: 'Home',
  data () {
    return {
      user: null,
      active: 0,
      cates: []
    }
  },
  components: {
    NavBar,
    Cover
  },
  created () {

    // this.getUserinfo()
    // this.getCategoryData()
  },
  activated () {
    this.getUserinfo()
    this.getCategoryData()
  },
  computed: {
    cateId () {
      return this.cates && this.cates[this.active]._id
    },
    cateItem () {
      return this.cates && this.cates[this.active]
    }
  },
  methods: {
    async getUserinfo () {
      const res = await this.$axios.get('/user/' + localStorage.getItem('id'))
      // console.log(res);
      this.user = res.data[0]
    },
    // 获取栏目数据
    async getCategoryData () {
      let data = []
      if (localStorage.getItem('newCate')) {
        const res = await this.$axios.get('/category')

        data = JSON.parse(localStorage.getItem('newCate'))
      } else {
        const res = await this.$axios.get('/category')
        data = res.data
      }
      // 将改造后的数据赋值给cates
      this.cates = this.changeCates(data)
      this.getArticles()
    },
    // 获取文章数据
    async getArticles () {
      const res = await this.$axios.get('/detail/' + this.cateId, {
        params: {
          page: this.cateItem.page,
          pagesize: this.cateItem.pagesize
        }
      })
      // console.log(res.data)
      // 将获取到的文章数据添加到cates中
      this.cateItem.list.push(...res.data)
      // console.log(this.cates);
      this.cateItem.loading = false
      if (res.data.length < this.cateItem.pagesize) {
        // 如果获取到的数据小于指定的长度，关闭加载中
        this.cateItem.finished = true
      }
    },
    // 对频道数据进行修改
    changeCates (data) {
      const cates = data.map(v => {
        v.page = 0
        v.pagesize = 10
        v.list = []
        v.loading = false
        v.finished = false
        return v
      })
      return cates
    },
    onLoad () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.cateItem.page += 1
      this.getArticles()
    }
  },
  watch: {
    active () {
      this.getCategoryData()
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .tab_menu {
    .home_edit_btn {
      position: absolute;
      right: 10px;
      bottom: 0;
      top: 10px;
      font-size: 24px;
    }
  }
  background-color: #fff;
  .cover_wrap {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .cover_item {
      width: 47%;
    }
  }
}
</style>
