<template>
  <div class="hm-comment">
   <div class="info">
     <div class="left">
       <img :src="$axios.defaults.baseURL+comment.user.head_img" alt="">
       </div>
     <div class="center">
       <p>{{comment.user.nickname}}</p>
       <p>{{comment.create_date | time('YYYY-MM-DD HH:mm:ss')}}</p>
      </div>
      <div class="reply" @click="reply(comment.id)">回复</div>
   </div>

   <!-- 渲染楼层结构，有parent就渲染 -->
   <hm-floor v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>
   <div class="comment">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from '../components/HmFloor'
export default {
  components: {
    HmFloor
  },
  props: {
    comment: Object
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
      // console.log(id)
      console.log('我是子组件的', id)
    }
  }
}
</script>

<style lang="scss" scoped>
   .hm-comment{
     margin-top: 10px;
     border-bottom: 1px solid #ccc;
     padding: 0 15px;
    .info{
       display: flex;
       padding:10px;
       justify-items: flex-end;
       .left{

       img{
         width: 35px;
         height: 35px;
         border-radius: 50%;
       }
     }
     .center{
       margin-left: 5px;
       flex: 1;
       p:first-child{
         font-size: 14px;
       }
     }
    }
    .comment{
      font-size: 16px;
      color:#000;

      padding: 10px;
    }
   }
</style>
