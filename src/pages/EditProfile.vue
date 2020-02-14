<template>
<div class="EditProfile">
  <hm-header name="编辑资料"></hm-header>
  <div class="photo"><img :src="avatar" alt="">
  <!-- 头像修改 -->
  <van-uploader :after-read="afterRead"/>

  </div>
  <hm-nav name="昵称" :desc="profile.nickname" @click="showNickname"></hm-nav>
  <hm-nav name="密码" desc="******" @click="showPassword"></hm-nav>
  <hm-nav name="性别" :desc="profile.gender===1?'男':'女'" @click="showGender"></hm-nav>

  <!-- 修改昵称 -->
  <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="editNickname">
  <van-field v-model="nickname" placeholder="请输入用户名" />
</van-dialog>

<!-- 修改密码 -->
<van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="editPassword">
    <van-field v-model="password" placeholder="请输入密码" />
</van-dialog>

<!-- 修改性别 -->
<van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="editGender">
  <van-radio-group v-model="gender">
    <van-cell-group>
    <van-cell title="男" clickable @click="gender = 1">
      <van-radio slot="right-icon" :name="1" />
    </van-cell>
    <van-cell title="女" clickable @click="gender = 0">
      <van-radio slot="right-icon" :name="0" />
    </van-cell>
  </van-cell-group>
  </van-radio-group>
</van-dialog>

<!-- 遮罩层 -->
<div class="mask" v-show="isShowmask">
<!-- 使用vueCropper插件 -->
  <vueCropper
  ref="cropper"
  :img="option.img"
  :outputSize="option.outputSize"
  :outputType="option.outputType"
  :info="option.info"
  :canScale="option.canScale"
  :autoCrop="option.autoCrop"
  :autoCropWidth="option.autoCropWidth"
  :autoCropHeight="option.autoCropHeight"
  :fixed="option.fixed"
></vueCropper>
<van-button type="primary" @click="crop">开始截屏</van-button>
<van-button type="danger" @click="isShowmask=false">取消截屏</van-button>
</div>
</div>
</template>

<script>
import img from '../assets/avatar.jpg'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        // 如果有头像，拼接上基准路径
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        // 如果没有，显示默认图像
        return img
      }
    }
  },
  data () {
    return {
      profile: {},
      loading: false,
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 0,
      isShowmask: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`, {
        headers: {
          Authorization: token
        }
      })
      this.profile = res.data.data
      this.loading = true
      console.log(this.profile)
    },
    // data形参数据
    async getEditProfile (data) {
      // console.log(this.nickname)
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast('修改成功')
        // 重新渲染
        this.getProfile()
      }
    },
    // 显示昵称
    showNickname () {
      this.isShowNickname = true
      this.nickname = this.profile.nickname
    },
    editNickname () {
      // 调用封装好的函数，传入数据实参
      this.getEditProfile({ nickname: this.nickname })
    },
    showPassword () {
      console.log(123)
      this.isShowPassword = true
      this.password = this.profile.password
    },
    editPassword () {
      console.log(this.password)
      this.getEditProfile({ password: this.password })
    },
    showGender () {
      console.log('嘻嘻')
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    editGender () {
      this.getEditProfile({ gender: this.gender })
    },
    async afterRead (file) {
      console.log(file)
      this.isShowmask = true
      this.option.img = file.content
      // // 上传文件
      // const fd = new FormData()
      // fd.append('file', file.file)
      // // 把图片上传给后台
      // const res = await this.$axios.post('/upload', fd)
      // console.log(res)
      // const { data, statusCode } = res.data
      // if (statusCode === 200) {
      //   this.getEditProfile({ head_img: data.url })
      // }
    },
    crop () {
      console.log(111)
      this.$refs.cropper.getCropData(async imgData => {
        // this.fileinfo.url = data
        // this.isShowCropper = false

        // 先将显示图片地址清空，防止重复显示
        // this.option.img = ''

        // 将剪裁后base64的图片转化为file格式
        const file = this.convertBase64UrlToBlob(imgData)
        // 上传文件
        const fd = new FormData()
        fd.append('file', file)
        // 把图片上传给后台
        const res = await this.$axios.post('/upload', fd)
        console.log(res)
        const { data, statusCode } = res.data
        if (statusCode === 200) {
          this.getEditProfile({ head_img: data.url })
        }
        this.isShowmask = false
      })
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1])// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }
  }
}
</script>

<style lang="scss" scoped>
.EditProfile{
  padding: 20px;
  .photo{
    margin-top: 30px;
    position: relative;
    img{
      width: 70px;
      height: 70px;
       border-radius: 50%;
       margin:0 auto;
    }
    .van-uploader{
      position: absolute;
      top:0px;
      left:50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .van-dialog {
  padding: 10px;
  .van-field {
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .van-button{
    position: fixed;
    top: 0;
    }
    .van-button:first-child{
      left:0px;
    }
    .van-button:last-child{
      right:0px;
  }
}
}
</style>
