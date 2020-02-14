<template>
  <div class="hm-post" @click="$router.push(`/news-detail/${post.id}`)">
    <!-- 视频 -->
    <div class="video" v-if="post.type===2">
       <p class="txt-cut">{{post.title}}</p>
      <div class="imgs">
        <img :src="post.cover[0].url" alt="">
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="newspaper">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
       </div>
    </div>
    <!-- 单张图片样式 -->
    <div class="info" v-else-if="post.cover.length<3">
       <div class="news">
        <p class="txt-cut">{{post.title}}</p>
        <div class="newspaper">
        <span>{{post.user.nickname}}</span>
        <span> {{post.comment_length}}跟帖</span>
       </div>
       </div>
        <div class="photo">
        <img :src="post.cover[0].url" alt="">
       </div>
      </div>

      <!-- 多图片样式 -->
      <div class="mutipul" v-else>
      <p class="txt-cut">{{post.title}}</p>
      <div class="imgs">
        <img  v-for="item in post.cover" :key="item.id" :src="item.url" alt="">
      </div>
      <div class="newspaper">
        <span>{{post.user.nickname}}</span>
        <span> {{post.comment_length}}跟帖</span>
       </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="scss" scoped>
.info{
         padding:0 10px;
         border-bottom: 1px solid #ccc;
         display: flex;
         justify-content: space-between;

         .news{
           margin-top: 10px;
           font-size: 14px;
           color: #000;
           flex-direction: column;
            .newspaper{
           color: #9999;
           font-weight: 400;
           line-height: 30px;

         }
         }
         .photo{
             margin: 5px 0;
           img{
             width: 70px;
             height: 70px;
             object-fit:cover;
           }
         }
       }
       .mutipul{
         padding:0 10px;
         border-bottom: 1px solid #ccc;
         p{
           margin-top: 10px;
           font-size: 14px;
           color: #000;
           flex-direction: column;
         }

         .imgs{
           width: 100%;
           display: flex;
           justify-content: space-around;
           margin-top: 5px;
          img{
            width: 33%;
            height: 74px;

            object-fit: cover;
             margin: 5px 0;

          }
         }
        .newspaper{
           color: #9999;
           font-weight: 400;
           line-height: 30px;
           span{
             font-size: 14px;
             margin-left:5px;
           }
         }
       }
       .video{
         padding:0 10px;
         border-bottom: 1px solid #ccc;
         p{
           margin-top: 10px;
           font-size: 14px;
           color: #000;
           flex-direction: column;
         }

         .imgs{
           position: relative;
           width: 100%;
         img{
            width: 100%;

            margin: 5px 0;

          }
          .iconshipin{
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%,-50%);
           font-size: 40px;
           width: 50px;
           height: 50px;
           background-color: rgba(0,0,0,.5);
           border-radius: 50%;
           text-align: center;
           line-height: 50px;
           color: #fff;
          }
         }
          .newspaper{
           color: #9999;
           font-weight: 400;
           line-height: 30px;
           span{
             font-size: 14px;
             margin-left:5px;
           }
         }
       }
</style>
