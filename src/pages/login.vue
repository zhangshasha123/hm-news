<template>
<div class="login">
  <!-- 放页面级别的组件 -->
  <div class="close" @click="$router.go(-1)">
    <i class="iconfont iconicon-test"></i>
  </div>
  <div class="logo">
    <i class="iconfont iconnew"></i>
  </div>
  <div class="username">
    <hm-input placeholder="请输入用户名" v-model="username" :rules="/^1\d{4,10}$/" errMsg="用户名输入有误"></hm-input>
  </div>
   <div class="password">
     <hm-input type="password" placeholder="请输入密码" v-model="password" :rules="/^\d{2,8}$/" errMsg="密码错误"></hm-input>
   </div>
   <div class="btn">
     <hm-button @click="login">登录</hm-button>
   </div>
   <div class="go-register">
     没有账号，立即<router-link to="/register">注册</router-link>
   </div>
</div>
</template>

<script>
import HmInput from '../components/HmInput'
import HmButton from '../components/HmButton'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(111)
      if (!this.username || !this.password) return
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        // console.log(res)
        if (res.data.statusCode === 401) {
          // alert('输入密码错误')
          // console.log(this)
          // this.$toast('提示文案')
          this.$toast.fail('输入密码有误')
        } else {
          // alert('登录成功')
          this.$toast.success('登录成功')
          this.$router.push('/profile')
        }
      })
    }
  },
  created () {
    console.log(this.$router)
    const { username, password } = this.$router.currentRoute.params
    this.username = username
    this.password = password
  },
  components: {
    HmInput,
    HmButton
  }
}
</script>

<style lang="scss" scoped>
.login{
  padding: 20px;
  .close{
    i{
      font-size:27px;
      }
  }
  .logo{
    text-align: center;
    i{
      font-size: 126px;
      color:#d81e06 ;
    }
  }
  .go-register{
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
