<template>
  <div class="article_container" v-if="articleDetail">
    <nav-bar :url="articleDetail.userinfo && articleDetail.userinfo.user_img"></nav-bar>
    <video class="video" :src="articleDetail.content" controls></video>
    <detail
      :article="articleDetail"
      @collectionClick="handleCollectionClick"
      @subscriptClick="handleSubscriptClick"
      :commend="commendData"
      :is-subscript="isSubscript"
      :is-collection="isCollection"
    ></detail>
    <!-- 评论区域 -->
    <comment-title
      ref="comment-title"
      @publishComment="publishComment"
      :url="articleDetail.userinfo && articleDetail.userinfo.user_img"
      :length="length"
    ></comment-title>
    <comment
      ref="comment"
      @commentLen="res => length = res"
      @replyComment="replyComment"
      :url="articleDetail.userinfo && articleDetail.userinfo.user_img"
    ></comment>
  </div>
</template>

<script>
import NavBar from '@/components/userComponents/Navbar'
import Detail from './Detail'
import CommentTitle from '@/components/article/CommentTitle'
import Comment from '@/components/article/Comment'

export default {
  name: '',
  components: {
    NavBar,
    Detail,
    CommentTitle,
    Comment
  },
  data () {
    return {
      articleDetail: null,
      commendData: null,
      // 评论数据的条数
      length: 0,
      // 评论数据
      comment: {
        comment_date: '',
        comment_content: '',
        article_id: null,
        parent_id: null
      },
      // 是否收藏
      isCollection: false,
      // 是否关注
      isSubscript: false
    }
  },
  created () {
    this.getDetailData()
    this.getRecommendData()
    this.getCollection()
  },
  methods: {
    async getDetailData () {
      const res = await this.$axios.get('/article/' + this.$route.params.id)
      this.articleDetail = res.data[0]
      if (this.articleDetail) {
        this.getSubscript()
      }
    },
    // 获取推荐数据
    async getRecommendData () {
      const res = await this.$axios.get('/commend')
      // console.log(res);
      this.commendData = res.data
    },
    // 发表评论
    async publishComment (content) {
      if (!localStorage.getItem('token') || !localStorage.getItem('id')) {
        this.$toast.fail('请先登录')
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
        return
      }
    },
    // 回复评论
    replyComment (id) {
      // console.log(id);

      // 将comment中的parent_id修改为子组件传过来的评论id
      this.comment.parent_id = id
      this.$refs['comment-title'].focusInput()
    },
    // 点击收藏
    async handleCollectionClick () {
      // 发请求
      const res = await this.$axios.post('/collection/' + localStorage.getItem('id'), {
        article_id: this.$route.params.id
      })
      // console.log(res);
      if (res.data.code === 200) {//请求成功
        this.$toast.success(res.data.msg)
        if (res.data.msg === '收藏成功') {
          this.isCollection = true
        } else {
          this.isCollection = false
        }
      }
    },
    async getCollection () {
      if (localStorage.getItem('token')) {
        const res = await this.$axios.get('/collection/' + localStorage.getItem('id'), {
          params: {
            article_id: this.$route.params.id
          }
        })
        // console.log(res);
        this.isCollection = res.data.success
      }
    },
    // 点击关注
    async handleSubscriptClick () {
      // 发请求
      const res = await this.$axios.post('/sub_scription/' + localStorage.getItem('id'), {
        sub_id: this.articleDetail && this.articleDetail.userid
      })
      // console.log(res);
      if (res.data.code === 200) {//请求成功
        this.$toast.success(res.data.msg)
        if (res.data.msg === '关注成功') {
          this.isSubscript = true
        } else {
          this.isSubscript = false
        }
      }
    },
    async getSubscript () {
      if (localStorage.getItem('token')) {
        const res = await this.$axios.get('/sub_scription/' + localStorage.getItem('id'), {
          params: {
            sub_id: this.articleDetail && this.articleDetail.userid
          }
        })
        this.isSubscript = res.data.success
      }
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to);
      // console.log(from);

      this.getDetailData()
      this.getRecommendData()
      this.getCollection()
    }
  }
}
</script>
<style scoped lang='less'>
.article_container {
  background-color: #fff;
  .video {
    width: 100%;
  }
}
</style>