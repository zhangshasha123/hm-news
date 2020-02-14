<template>
  <div class="collect">
    <hm-header name="我的收藏"></hm-header>
    <!-- <ul>
      <li class="info" v-for="item in getCollectList" :key="item.id">
       <div class="news">
        <p class="txt-cut">{{item.title}}</p>
        <div class="newspaper">
        <span>{{item.user.nickname}}</span>
        <span> {{item.comments.length}}跟帖</span>
       </div>
       </div>
        <div class="photo">
        <img :src="item.cover[0].url" alt="">
       </div>
      </li>
    </ul> -->
    <hm-post v-for="item in getCollectList" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
import HmPost from '../components/HmPost'
export default {
  components: {
    HmPost
  },
  data () {
    return {
      getCollectList: []
    }
  },
  created () {
    this.getCollect()
  },
  methods: {
    async  getCollect () {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        data.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
      this.getCollectList = data
      // console.log(this.getCollectList)
    }
  }
}
</script>

<style lang="scss" scoped>
   .collect{
     ul{
       .info{
         padding:0 20px;
         border-bottom: 1px solid #ccc;
         display: flex;
         justify-content: space-between;
         .news{
           margin-top: 10px;
           font-size: 14px;
           color: #000;
            .newspaper{
           color: #9999;
           font-weight: 400;
           line-height: 30px;
         }
         }
         .photo{
             margin-top: 5px;
           img{
             width: 70px;
             height: 70px;
             object-fit:cover;
           }
         }

       }
     }
   }
</style>
