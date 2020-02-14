<template>
  <div class="profile">
   <div class="user-info" @click="$router.push('/edit-profile')">
     <div class="avatar">
       <!-- 如果有头像就显示头像，如果没有就显示默认的 -->
       <img v-show="loading" :src="avatar" alt="">
     </div>
     <div class="info">
        <p>
          <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>

       <p>{{profile.create_date | time}}</p>
     </div>
     <div class="info-right">
       <i class="iconfont iconjiantou1"></i>
     </div>
   </div>
   <div class="list">
     <hm-nav name="我的关注" desc="关注的用户" @click="$router.push('/follow')"></hm-nav>
     <hm-nav name="我的跟帖" desc="跟帖/回复" @click="$router.push('/post')"></hm-nav>
     <hm-nav name="我的收藏" desc="文章/视频" @click="$router.push('collect')"></hm-nav>
     <hm-nav name="栏目管理" @click="$router.push('/tab-manager')"></hm-nav>
     <hm-nav name="设置" @click="$router.push('/edit-profile')"></hm-nav>
     <div class="last"><van-button type="default" @click="logout">退出登录</van-button></div>
     <!-- <hm-nav name="退出登录" @click="logout" class="logout"></hm-nav> -->
   </div>
  </div>
</template>

<script>
import img from '../assets/avatar.jpg'
export default {
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  data () {
    return {
      profile: {},
      loading: false
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    // 如果需要权限校验的接口（用户登录），需要发送请求的时候增加一个请求头，，，Authorization: token
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(res)
    this.profile = res.data.data
    this.loading = true
    console.log(this.profile)
  },
  methods: {
    async logout () {
      console.log('嘻嘻嘻')
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统么？'
        })
        // 点击确认 删除token
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        // 跳转到登录页面
        this.$router.push('/login')
        // 给一个提示消息
        this.$toast.success('退出成功')
      } catch {
        this.$toast('操作取消')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
   .user-info{
     padding: 20px;
     border-bottom: 5px solid #ccc;
     display: flex;
     .avatar{
        img{
          width: 70px;
          height: 70px;
          margin: 0 auto;
          border-radius: 50%;
        }
     }
    .info{
     margin-left: 10px;
     flex: 1;
     p:first-child{
       height: 30px;
       line-height: 30px;
       font-size: 18px;
      .iconxingbienan{
        color: skyblue;
      }
      .iconxingbienv{
        color: pink;
      }
     }

     p:last-child{
       height: 30px;
       line-height: 30px;
       color: #999;

     }
   }
    .info-right{
     height: 40px;
     width: 40px;
     i{
       width: 40px;
       color: rgb(171, 213, 242);
     }
   }
   }
   .list{
     padding: 20px;
     .last{
       text-align: center;
       margin-top:10px;
     }
   }
}
</style>
