<template>
  <div class="post">
    <hm-header name="我的跟帖"></hm-header>

    <div class="content" v-for="item in postlist" :key=item.id>
      <div class="time">{{item.create_date}}</div>
     <div class="parent" v-if="item.parent">
      <!-- <p>{{item.create_date}}</p> -->
      <p>回复： {{item.parent.user.nickname}}</p>
      <p>{{item.post.title}}</p>
     </div>
     <div class="reply">
     {{item.content}}
     </div>
     <div class="source">
      <p class="one-txt-cut">原文：{{item.post.title}}</p>
      <span><i class="iconfont iconjiantou1"></i></span>
     </div>
    </div>

     <van-list
       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
       :immediate-check="false"
>
       <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>

       <div class="more">
      <p>更多跟贴  <span>  >> </span></p>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postlist: [],
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 4
    }
  },
  created () {
    this.getPostList()
  },
  methods: {
    async  getPostList () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postlist = [...this.postlist, ...data]
        this.loading = false
        console.log(this.getPostlist)
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      console.log('已经到底啦')
      this.pageIndex++
      this.getPostList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .post{
    .content{
    padding:20px;
    .time{
      height: 30px;
      font-size: 14px;
      color:#ccc;
    }
     .date{
      //  height: 30px;
      font-size: 14px;
       line-height: 30px;
       p:first-child{
         color:#9999;
       }
       p:last-child{
         color:#000;

       }
     }
     .source{
       overflow: hidden;
       font-size: 14px;
       font-weight: 100;
       color:#9999;
       border-bottom: 1px solid #9999;
       padding-bottom: 10px;
       display: flex;
       p{
         flex: 1;
       }
     }
     .parent{
       margin-top: 10px;
       font-size: 14px;
       line-height: 30px;
       background-color: #ccc;

       p:first-child{
         color:#9999;
       }
     }
     .reply{
       color: #000;
       font-size: 14px;
       line-height: 30px;
       margin: 10px 0;
     }

    }
    .more{
       text-align: center;
       font-size: 14px;
       margin-top:15px;
       span{
         font-family: 宋体;
       }
     }
  }
</style>
