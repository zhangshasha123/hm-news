<template>
<div class="item" @click="handler">
       <div class="left">{{name}}</div>
       <div class="center">{{desc}}</div>
       <div class="right">
         <i class="iconfont iconjiantou1"></i>
       </div>
     </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  },
  methods: {
    handler () {
      // console.log(111)
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
 .item{
     display: flex;
     border-bottom: 1px solid #ccc;
     height: 40px;
     line-height: 40px;
      .left{
        color: #000;
      }
      .center{
        flex: 1;
        text-align: right;
      }
     }
</style>
