<template>
  <div class="HmHeader">
    <div class="left" @click="$router.back()">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">{{name}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }

  }
}
</script>

<style lang="scss" scoped>
.HmHeader{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color:#000;
  border-bottom: 1px solid #ccc;
  .left,.right{
    width: 40px;
  }
   .center{
     flex:1;
     font-weight: bold;
     font-size: 14px;
   }
}
</style>
