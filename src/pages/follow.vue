<template>
  <div class="follow">
  <hm-header name="我的关注"></hm-header>
  <div class="HmNewscast" v-for="item in followList" :key="item.id">
    <div class="news-left">
      <img class="photo" :src="$axios.defaults.baseURL+item.head_img" alt="">
    </div>
    <div class="center">
      <p>{{item.nickname}}</p>
      <p>{{item.create_date | time}}</p>
    </div>
    <div class="right" @click="unfollow(item.id)">
      <button class="focus">取消关注</button>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      followList: []
    }
  },
  created () {
    // 全局用this.
    this.getFollowList()
    // this.follow(1)
    // this.follow(2)
    // this.follow(3)
    // this.follow(4)
    // this.follow(5)
  },
  methods: {
    async getFollowList () {
      // const token = localStorage.getItem('token')
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.followList = data
      }
      console.log(this.followList)
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确认取消关注么？'
        })
        // const token = localStorage.getItem('token')
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        console.log(res)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success('取消关注成功')
          this.getFollowList()
        }
      } catch {
        this.$toast('取消操作')
      }
    },
    async follow (id) {
      const res = await this.$axios.get(`/user_follows/${id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.getFollowList()
      }
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
  align-items: center;
  .news-left{
    width: 40px;
    height: 40px;
    .photo{
    width: 40px;
     height: 40px;
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
    // width: 70px;
    // height: 70px;
    // margin-top: 15px;
    .focus{
       width: 60px;
       height: 30px;
       border-radius: 15px;

    }
  }
}
</style>
