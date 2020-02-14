<template>
  <div class="HmNewscast">
    <div class="news-left">
      <img class="photo" src="../assets/avatar.jpg" alt="">
    </div>
    <div class="center">
      <p>火星新闻播报</p>
      <p>2020-02-01</p>
    </div>
    <div class="right" @click="unfollow">
      <button class="focus">取消关注</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    unfollow () {
      // console.log(123)
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.HmNewscast{
  display: flex;
  margin-top:10px;
  padding:20px;
  border-bottom: 1px solid #999999;
  .news-left{
    width: 70px;
    height: 70px;
    .photo{
    width: 70px;
     height: 70px;
     border-radius: 50%;
    }
  }
  .center{
    flex:1;
    margin-left:15px;
    p:first-child{
      color:#000;
      font-size: 14px;
      line-height: 25px;
    }
    p:last-child{
      color:#ccc;
      font-size: 14px;
      line-height: 25px;
    }
  }
  .right{
    width: 70px;
    height: 70px;
    margin-top: 15px;
    .focus{
       width: 60px;
       height: 30px;
       border-radius: 15px;

    }
  }
}
</style>
