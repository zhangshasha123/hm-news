<template>
  <div class="register">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
      </div>
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="username">
        <Hm-Input placeholder="用户名/手机号码" v-model="form.username" :rules="/^1\d{4,10}$/" errMsg="用户名输入有误"></Hm-input>
      </div>
      <div class="nickname">
        <Hm-Input placeholder="昵称" v-model="form.nickname" :rules="/^[\u4e00-\u9fa5]{3,8}$/" errMsg="需要3-8个文字哦"></Hm-input>
      </div>
      <div class="password">
        <Hm-Input type="password" placeholder="密码" v-model="form.password" :rules="/^\d{2,8}$/" errMsg="密码错误"></Hm-input>
      </div>
      <div class="btn">
      <van-button type="danger" round size="large" @click="register">注册</van-button>
      </div>
      <div class="login">
        已有账号，立即<router-link to="/login">登录</router-link>
      </div>

  </div>
</template>

<script>
import HmInput from '../components/HmInput'

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register () {
      // if (!this.username || !this.password || !this.nickname) return
      console.log(111)
      const res = await this.$axios.post('http://localhost:3000/register', this.form)
      // console.log(res)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已存在')
      } else {
        this.$toast.success('注册成功')
        // this.$router.push('/login')
        // 把注册的参数携带传过去
        this.$router.push({ name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  },
  components: {
    HmInput

  }
}
</script>

<style lang="scss" scoped>
.register{
  padding:20px;
  .close{
    i{
      font-size: 27px;
    }
  }
  .logo{
       text-align: center;

    i{
       font-size: 126px;
       color: #d81e06;
    }

  }
  .btn{
   margin-top:20px;
  }
  .login{
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
