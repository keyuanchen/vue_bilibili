<template>
  <div class="comment_item" v-if="commentChildren">
    <div class="comment_content" v-for="(item, index) in commentChildren" :key="index">
      <div class="comment_right">
        <div class="comment_user">
          <img :src="item.userinfo.user_img" v-if="item.userinfo" alt />
          <img src="@/assets/default_img.jpg" v-else alt />
        </div>
        <div class="info_wrap">
          <div class="name_date_row">
            <span class="user_name">{{item.userinfo.name}}</span>
            <span class="comment_date">
              {{item.comment_date}}
              <span
                class="reply"
                @click="replyChild(item.comment_id)"
              >&nbsp;&nbsp;回复</span>
            </span>
          </div>
          <div class="comment_main" v-if="!temp">
            <div class="comment_text">{{item.comment_content}}</div>
          </div>
          <div class="comment_main" v-if="temp">
            <div class="comment_text">
              回复
              <span
                class="parent_user_name"
              >{{item.parent_user_info && item.parent_user_info.name}}</span>
              :
              {{item.comment_content}}
            </div>
          </div>
        </div>
      </div>
      <div class="comment_child">
        <commentchild-item
          @replycom="replycommentchild"
          :comment-children="item.children"
          :temp="true"
        ></commentchild-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentchildItem',
  data () {
    return {
    }
  },
  props: {
    commentChildren: null,
    temp: false
  },
  methods: {
    replyChild (id) {
      this.$emit('replycom', id)
    },
    replycommentchild (id) {
      // console.log(id);
      this.$emit('replycom', id)
      // this.replyChild(id)
    }
  },
}
</script>
<style scoped lang='less'>
.comment_item {
  .comment_content {
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    .comment_right {
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
            .parent_user_name {
              color: #21a2f1;
            }
          }
        }
      }
    }
  }
}
.comment_child {
  padding: 5px 0;
}
</style>