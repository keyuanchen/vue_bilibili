<template>
  <div class="comment_title">
    <div class="comment_text_row">
      <div class="comment_text">
        评论
        <span>({{length}})</span>
      </div>
    </div>
    <div class="post_comment_row">
      <img :src="url" v-if="url" alt />
      <img src="@/assets/default_img.jpg" v-else alt />
      <input ref='input' v-model="comment" type="text" placeholder="说点什么吧" class="comment_input" />
      <button class="comment_btn" @click="publishClick">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      comment: ''
    }
  },
  props: {
    url: '',
    length: 0
  },
  methods: {
    // 点击发表评论按钮
    publishClick() {
      const content = this.comment.trim()
      if(!content) {
        this.$toast.fail('请说点什么吧~')
        return 
      }
      this.$emit('publishComment', content)
    },
    // 点击获取输入框焦点
    focusInput() {
      this.$refs.input.focus()
    }
  },
}
</script>
<style scoped lang='less'>
.comment_title {
  padding: 15px;
  .comment_text_row {
    font-size: 18px;
    padding-bottom: 10px;
    .comment_text {
      span {
        font-size: 16px;
        color: #fb7299;
      }
    }
  }

  .post_comment_row {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .comment_input {
      outline: 0;
      border: 0;
      background-color: #e5e5e5;
      height: 30px;
      font-size: 14px;
      padding: 0 10px;
      line-height: 30px;
      border-radius: 15px;
      margin-right: 10px;
    }

    .comment_btn {
      outline: 0;
      border: 0;
      color: #fff;
      background-color: #fb7299;
      padding: 5px 15px;
      border-radius: 16px;
      font-size: 14px;
    }
  }
}
</style>