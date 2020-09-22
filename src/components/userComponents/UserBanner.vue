<template>
  <div class="user_banner">
    <div class="user_wrap">
      <div class="user_avatar">
        <img src="@/assets/head_img.jpg" alt />
      </div>
      <div class="info_wrap">
        <div class="user_follow_row">
          <div class="followers_wrap info_wrap">
            <span class="num">1</span>
            <span class="text">粉丝</span>
          </div>
          <div class="attention_wrap info_wrap">
            <span class="num">2</span>
            <span class="text">关注</span>
          </div>
          <div class="like_wrap info_wrap">
            <span class="num">3</span>
            <span class="text">获赞</span>
          </div>
        </div>
        <div class="edit_info_wrap" @click="$router.push('/edit')">
          <div class="edit_text">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="user_name_row">
      <h3>小风___</h3>
      <div class="user_desc">这个人很神秘，什么都没有写~</div>
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
  methods: {},
}
</script>
<style scoped lang='less'>
.user_banner {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .user_wrap {
    display: flex;
    padding: 0 10px;
    .user_avatar {
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
      }
    }

    .info_wrap {
      flex: 1;
      padding: 10px;
      .user_follow_row {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .info_wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .text {
            color: #555;
            font-size: 12px;
          }
        }
        .followers_wrap {
          .num {
          }

          .text {
          }
        }

        .attention_wrap {
          .num {
          }

          .text {
          }
        }

        .like_wrap {
          .num {
          }

          .text {
          }
        }
      }

      .edit_info_wrap {
        border: 1px solid #fb7299;
        height: 30px;
        border-radius: 5px;
        background-color: #fff;
        color: #fb7299;
        display: flex;
        justify-content: center;
        align-items: center;
        .edit_text {
        }
      }
    }
  }
  .user_name_row {
    padding: 10px;
    .user_desc {
      color: #555;
      margin-top: 10px;
    }
  }
}
</style>