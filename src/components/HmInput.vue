<template>
  <div class="input-box">
    <input :type="type" class="hm-input" :class="[status]" :placeholder="placeholder" :value="value" @input="handleInput">
    <span class="tips" v-show="showTips">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  computed: {
    showTips () {
      return this.status === 'error' && this.errMsg
    }
  },
  props: {
    type: {
      type: String,
      dafault: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    handleInput (e) {
      // console.log(e.target.value)
      // this.value = e.target.value
      const { value } = e.target
      this.$emit('input', value)
      if (!this.rules) return
      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.input-box{
  padding-bottom: 15px;
  position: relative;
  .hm-input{
    width: 100%;
    height: 38px;
    background-color: transparent;
    border-bottom: 1px solid #666;
    font-size: 18px;
    &.error{
     border-bottom-color: red;
    }
    &.success{
    border-bottom-color: green;
    }
  }
  .tips{
    color:red;
    position: absolute;
    bottom:0;
    left:0;
  }
}
</style>
