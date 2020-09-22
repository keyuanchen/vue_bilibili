<template>
  <div class="edit_banner" @click="bannerClick">
    <div class="banner_text">{{left}}</div>
    <div class="banner_content">
      <slot></slot>
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
    left: {
      type: String
    }
  },
  methods: {
    bannerClick () {
      this.$emit('bannerClick')
    }
  },
}
</script>
<style scoped lang='less'>
.edit_banner {
  background-color: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .banner_text {
  }

  .banner_content {
  }
}
</style>