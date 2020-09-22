<template>
  <div class="comment_container" v-if="comments">
    <div v-for="(item, index) in comments" :key="index">
      <div class="comment_content">
        <div class="comment_user">
          <img :src="item.userinfo.user_img" v-if="item.userinfo" alt />
          <img src="@/assets/default_img.jpg" v-else alt />
        </div>
        <div class="info_wrap">
          <div class="name_date_row">
            <span class="user_name">{{item.userinfo && item.userinfo.name}}</span>
            <span class="comment_date">
              {{item.comment_date}}
              <span class="reply" @click="replyClick(item.comment_id)">回复</span>
            </span>
          </div>
          <div class="comment_main">
            <div class="comment_text">{{item.comment_content}}</div>
          </div>
        </div>
      </div>
      <div class="commend_child">
        <comment-item @replycom="replyClick" :comment-children="item.children"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  name: '',
  data () {
    return {
      // 改造后的评论数据
      comments: null
    }
  },
  components: {
    CommentItem
  },
  props: {
    url: ''
  },
  created () {
    this.getCommentData()
  },
  methods: {
    // 获取评论数据
    async getCommentData () {
      const res = await this.$axios.get('/comment/' + this.$route.params.id)
      console.log(res);
      const length = res.data.length
      this.$emit('commentLen', length)
      this.comments = this.changeCommentData(res.data)
    },
    // 改造获取到的评论数据
    changeCommentData (data) {
      function fn (temp) {
        let arr = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) { //此时说明是一级评论
            arr.push(data[i])
            data[i].children = fn(data[i].comment_id)
          }
        }
        return arr
      }
      return fn(null)
    },
    //点击了回复
    replyClick (id) {
      this.$emit('replyComment', id)
    }
  },
}
</script>
<style scoped lang='less'>
.comment_container {
  padding: 0 15px;
  > div {
    border-bottom: 1px solid #eee;
    .comment_content {
      display: flex;
      .comment_user {
        margin-right: 15px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }

      .info_wrap {
        flex: 1;
        .name_date_row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          color: #666;
          .user_name {
          }

          .comment_date {
            .reply {
              color: #333;
            }
          }
        }

        .comment_main {
          .comment_text {
          }
        }
      }
    }
  }
}
.commend_child {
  padding: 5px 30px;
}
</style>