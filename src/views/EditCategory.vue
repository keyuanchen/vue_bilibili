<template>
  <div class="edit_category">
    <nav-bar :url="url"></nav-bar>
    <div class="new_cates">
      <van-divider :style="{color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">现有栏目</van-divider>
      <div class="cate_list" v-if="newCates.length">
        <div
          class="cate_item"
          v-for="(item, index) in newCates"
          :key="item._id"
          @click="handleNewCates(index)"
        >
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="del_cates">
      <van-divider :style="{ color: '#fb7299', borderColor: '#fb7299', padding: '0 16px' }">已删除栏目</van-divider>
      <div class="del_list" v-if="delCates.length">
        <div
          class="del_item"
          v-for="(item, index) in delCates"
          :key="item._id"
          @click="handleDelCates(index)"
        >
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/userComponents/Navbar'

export default {
  name: '',
  components: {
    NavBar
  },
  data () {
    return {
      url: null,
      newCates: JSON.parse(localStorage.getItem('newCate')) || [],
      delCates: JSON.parse(localStorage.getItem('delCate')) || []
    }
  },
  created () {
    this.getUserinfo()
    this.getCategoryData()
  },
  methods: {
    async getUserinfo () {
      const res = await this.$axios.get('/user/' + localStorage.getItem('id'))
      this.url = res.data[0].user_img
    },
    async getCategoryData () {
      // 当本地没有栏目数据时，才发请求获取
      if (!localStorage.getItem('newCate')) {
        const res = await this.$axios.get('/category')
        console.log(res);
        this.newCates = res.data
      }
    },
    // 点击现有栏目
    handleNewCates (i) {
      if (this.newCates.length > 3) {
        // 先添加到delCates中
        this.delCates.push(this.newCates[i])
        this.newCates.splice(i, 1)
      } else {
        this.$toast.fail('最少须有3个栏目')
      }
    },
    handleDelCates (i) {
      this.newCates.push(this.delCates[i])
      this.delCates.splice(i, 1)
    }
  },
  watch: {
    newCates (newVal) {
      localStorage.setItem('newCate', JSON.stringify(newVal))
      localStorage.setItem('delCate', JSON.stringify(this.delCates))
    }
  }
}
</script>
<style scoped lang='less'>
.edit_category {
  .new_cates {
    color: #1989fa;
    .cate_list {
      padding: 0 20px;
      display: flex;
      flex-wrap: wrap;
      .cate_item {
        width: 20%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #1989fa;
        margin: 0 13px 10px 0;
        span {
        }
      }
    }
  }

  .del_cates {
    color: #fb7299;
    .del_list {
      padding: 0 20px;
      display: flex;
      flex-wrap: wrap;
      .del_item {
        width: 20%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #fb7299;
        margin: 0 13px 10px 0;
        span {
        }
      }
    }
  }
}
</style>