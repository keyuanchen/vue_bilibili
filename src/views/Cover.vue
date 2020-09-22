<template>
  <div class="cover_wrap" v-if="article" @click="coverClick">
    <div class="cover_content">
      <div class="cover_img">
        <img :src="article.img" alt />
        <div class="cover_play_row">
          <span class="play_wrap">
            <i class="iconfont icon-shipin">1233</i>
            <i class="iconfont icon-pinglun">{{article.commentlen}}</i>
          </span>
        </div>
      </div>
      <div class="cover_title_row">
        <div class="cover_name">{{article.name}}</div>
      </div>
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
    article: null
  },
  methods: {
    coverClick () {
      this.$emit('pushArticle')
    }
  },
}
</script>
<style scoped lang='less'>
.cover_wrap {
  width: 100%;
  .cover_content {
    width: 100%;
    .cover_img {
      position: relative;
      img {
        width: 100%;
        height: 112px;
      }

      .cover_play_row {
        width: 100%;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 2px;
        background-color: rgba(0, 0, 0, 0.1);
        height: 20px;

        color: #fff;
        .play_wrap {
          display: flex;
          align-items: center;
          justify-content: space-around;
          .icon-video {
          }

          .icon-comment {
          }
        }
      }
    }

    .cover_title_row {
      .cover_name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>