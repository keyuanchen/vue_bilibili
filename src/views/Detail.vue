<template>
  <div class="detail_container">
    <div class="article_info_row">
      <div class="article_cate">{{article.category.title}}</div>
      <div class="article_name">{{article.name}}</div>
    </div>
    <div class="article_other_info">
      <div class="article_author">{{ article.userinfo && article.userinfo.name}}</div>
      <div class="view_num">136.1万次观看</div>
      <div class="danmu">4994弹幕</div>
      <div class="date_wrap">{{article.date}}</div>
    </div>
    <div class="collection_row">
      <div class="collection_icon">
        <i
          class="iconfont icon-collection-b"
          :class="{active: isCollection}"
          @click="handleCollection"
        >
          <span>收藏</span>
        </i>
      </div>
      <div class="attention_wrap">
        <i class="iconfont icon-guanzhu" :class="{active: isSubscript}" @click="subscriptClick">
          <span>关注</span>
        </i>
      </div>
      <div class="share_wrap">
        <i class="iconfont icon-fenxiang">
          <span>分享</span>
        </i>
      </div>
    </div>
    <!-- 推荐文章 -->
    <div class="commend_wrap" v-if="commend">
      <cover
        class="cover_item"
        v-for="item in commend"
        :key="item.id"
        @pushArticle="$router.push(`/article/${item.id}`)"
        :article="item"
      ></cover>
    </div>
  </div>
</template>

<script>
import Cover from './Cover'

export default {
  name: '',
  data () {
    return {
    }
  },
  components: {
    Cover
  },
  props: {
    article: null,
    commend: null,
    isCollection: false,
    isSubscript: false
  },
  methods: {
    handleCollection () {
      this.$emit('collectionClick')
    },
    subscriptClick () {
      this.$emit('subscriptClick')
    }
  },
}
</script>
<style scoped lang='less'>
.detail_container {
  padding: 15px;
  .article_info_row {
    display: flex;
    align-items: center;
    .article_cate {
      padding: 2px 10px;
      color: #fb7299;
      background-color: #fbf5f7;
      border-radius: 10px;
      margin-right: 20px;
    }

    .article_name {
      font-size: 20px;
    }
  }

  .article_other_info {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #bbbbbb;
    padding: 8px 0;
    .article_author {
      color: #555;
    }

    .view_num {
      margin: 0 10px;
    }

    .danmu {
    }

    .date_wrap {
      margin: 0 10px;
    }
  }

  .collection_row {
    padding: 0 10px 10px;
    display: flex;
    font-size: 30px;
    font-weight: 600;
    color: #777777;
    .collection_icon {
      i.iconfont {
      }
      .active {
        color: #fb7299;
      }
    }
    .iconfont {
      span {
        font-size: 12px;
        margin-left: 5px;
      }
    }
    .active {
      color: #fb7299;
    }

    .attention_wrap {
      margin-left: 20px;
      i.iconfont.icon-guanzhu {
      }
    }

    .share_wrap {
      margin-left: 20px;
      i.iconfont.icon-fenxiang {
      }
    }
  }
}
.commend_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .cover_item {
    width: 47%;
  }
}
</style>