<template>
  <div class="news-detail">
    <div class="info">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="btn-followed" @click="followed" v-if="detail.has_follow===true">已关注</div>
        <div class="btn-follow" @click="follow" v-else>关注</div>
      </div>
    </div>
    <!-- 新闻内容 -->
    <div class="news">
      <div class="title">{{detail.title}}</div>
      <div class="time">
        <span>{{detail.user.nickname}}</span>
        <span>{{detail.create_date | time}}</span>
      </div>
      <div class="=video" v-if="detail.type===2">
        <video :src="detail.content" controls></video>
      </div>
      <div class="content" v-html="detail.content" v-else></div>
    </div>
    <!-- 点赞和微信分享 -->
    <div class="btns">
      <div class="like" @click="like" :class="{good:detail.has_like}">
        <i class="iconfont icondianzan"></i>
        <span>{{detail.like_length}}</span>
      </div>
      <div class="share">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>
    <!-- 精彩跟帖区 -->
    <div class="commentList">
      <div class="title">精彩跟帖</div>
      <!-- 把帖子封装成组件 -->
      <hm-comments @reply="reply" v-for="item in commentList" :key="item.id" :comment="item"></hm-comments>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <!-- 显示input框 -->
      <div class="comment-input" v-if="!isFocus">
      <div class="write">
        <input type="text" placeholder="写跟贴" @focus="handleFocus">
      </div>
      <div class="num">
        <i class="iconfont iconpinglun-"></i>
        <span>{{detail.comment_length}}</span>
      </div>
      <i class="iconfont iconshoucang" @click="collect" :class="{likes:detail.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <!-- 显示textarea框 -->
    <div class="comment-textarea" v-else>
      <textarea rows="3" ref="textarea" placeholder="回复:" @blur="loseFocus" v-model="content"></textarea>
      <div class="send" @click="send">发送</div>
    </div>
    </div>
  </div>
</template>

<script>
import HmComments from '../components/HmComments'
export default {
  components: {
    HmComments
  },
  data () {
    return {
      detail: {
        user: {}
      },
      isFocus: false,
      content: '',
      commentList: [],
      parentId: ''
    }
  },
  created () {
    this.getnewsDetail()
    this.getCommentList()
  },
  methods: {
    async  getnewsDetail () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      console.log(res)
      const { statusCode, data } = res.data
      // console.log(data.content)
      if (statusCode === 200) {
        this.detail = data
      }
    },
    async  getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
      console.log(this.commentList)
    },
    async follow () {
      const id = this.detail.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      // console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.detail.has_follow = true
      }
    },
    async followed () {
      const id = this.detail.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      // console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注')
        this.detail.has_follow = false
      }
    },
    async like () {
      const id = this.detail.id
      const res = await this.$axios.get(`/post_like/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getnewsDetail()
        this.$toast.success(message)
      }
    },
    async collect () {
      console.log('111')
      const id = this.detail.id
      const res = await this.$axios.get(`/post_star/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getnewsDetail()
      }
    },
    async  handleFocus () {
      this.isFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    loseFocus () {
      if (this.content) {
        return
      }
      this.isFocus = false
    },
    async reply (id) {
      console.log('我接收到啦', id)
      this.parentId = id
      this.isFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      console.log('我要发送消息啦')
      const id = this.$route.params.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.isFocus = false
        this.content = ''
        this.parentId = ''
        this.getnewsDetail()
      }
    }
  },
  watch: {
    $router () {
      this.getnewsDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
    .news-detail{
      padding-bottom: 100px;
      padding-top: 50px;
      .info{
        width: 100%;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        padding:0 10px;
        height: 50px;
        line-height: 50px;
        border-bottom:1px solid #ccc;
        align-items: center;
        .left{
           display: flex;
           .iconnew{
             font-size: 50px;
             color:#000;
           }
        }
        .right{
         .btn-followed{
           height: 30px;
           line-height: 30px;
           border:1px solid #ccc;
           border-radius: 15px;
           padding:0 15px;
         }
         .btn-follow{
           height: 30px;
           line-height: 30px;
           border:1px solid #ccc;
           border-radius: 15px;
           padding:0 15px;
           background-color: red;
           color: #fff;
         }
        }
      }
      .news{
        padding:10px;
        .title{
          font-size: 16px;
          font-weight: bold;
        }
         .time{
            padding: 10px 0;
            span:first-child{
              margin-right: 15px;
            }
          }
          .video{
            width: 100%;
          }
      }
      .btns{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
        border-bottom:3px solid #ccc;
        .like,.share{
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        padding:0 15px;
        }
        .good{
          color:red;
          border: 1px solid red;
        }
        .iconfont{
          font-size: 14px;
          margin-right: 5px;
        }
        .iconweixin{
          color:rgba(1, 200, 1);
        }
      }
      .commentList{
        .title{
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 18px;
          color: #000;
          padding: 10px 0;
        }
      }
      .footer{
         padding:10px 0;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        .comment-textarea{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 0 20px;
        align-items: flex-end;
        textarea{
          background-color: #ccc;
          width: 240px;
          height: 70px;
          border-radius: 10px;
          padding: 10px;
        }
        .send{
          height: 30px;
          line-height: 30px;
          background-color: red;
          color:#fff;
          padding: 0 15px;
          border-radius: 15px;
        }
      }
      .comment-input{
        display: flex;

        justify-content: space-around;
        align-items: center;

        .write{
          input{
          width: 180px;
          height: 30px;
          line-height: 30px;
          text-indent: 10px;
          border-radius: 15px;
          background-color: #ccc;
          color: #000;
          padding-left: 15px;
          }

        }
        .iconfont{
            font-size: 24px;
          }
        .num{
          position: relative;

          span{
          position: absolute;
          top: -1px;
          right: -16px;
          height: 16px;
          line-height: 16px;
          padding:0 8px;
          color: #fff;
          background-color: red;
          border-radius: 10px;

          }
        }
        .likes{
          color:red;
        }
      }
       }
    }
</style>
