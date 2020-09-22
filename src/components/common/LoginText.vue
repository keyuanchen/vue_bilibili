<template>
  <div class="login_text">
    <van-cell-group>
      <van-field v-model="inputValue" :type="type" :label="label" :placeholder="placeholder" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      inputValue: ''
    }
  },
  props: ['label', 'placeholder', 'rule', 'type'],
  methods: {},
  watch: {
    inputValue (newVal) {
      const reg = new RegExp(this.rule)
      if (reg.test(newVal)) {
        this.$emit('inputContent', newVal)
      }
    }
  }
}
</script>
<style scoped lang='less'>
</style>