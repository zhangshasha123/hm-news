<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
<!-- 导航 -->
      <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tablist" :key="item.id">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        >
        <hm-post v-for="post in postList" :key="post.id" :post="post" ></hm-post>
      </van-list>
      </van-pull-refresh>
      </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import HmPost from '../components/HmPost'
export default {
  name: 'home',
  components: {
    HmPost
  },
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      tablist: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      refreshing: false,
      finished: false,
      postList: []
    }
  },
  async created () {
    // getlist数据需要在后面加载，所以用async await让前面先执行
    await this.gettabList()
    this.getpostList()
  },
  methods: {
    async  gettabList () {
      const Tablist = JSON.parse(localStorage.getItem('Tablist'))
      console.log(Tablist)
      if (Tablist) {
        this.tablist = Tablist
      } else {
        const res = await this.$axios.get('/category')
        // console.log(res)
        const { data, statusCode } = res.data
        if (statusCode === 200) {
          this.tablist = data
          console.log(this.tablist)
        }
      }
    },
    async  getpostList () {
      const id = this.tablist[this.active].id
      console.log(id)
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      console.log(res)
      const { data, statusCode } = res.data
      console.log(data)
      if (statusCode === 200) {
        this.postList = [...this.postList, ...data]
        console.log(this.postList)
        this.loading = false
        // 状态改成false，触发下一次加载
        this.refreshing = false
        if (data.length < this.pageSize) {
          // 没有更多数据啦
          this.finished = true
        }
        console.log(this.postList)
      }
      // 如果加载的数据小于每页的条数
      // console.log(this.postList)
    },
    onLoad () {
      // console.log('在加载了')
      if (this.finished) {
        return
      }
      this.pageIndex++
      this.getpostList()
    },
    onRefresh () {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // pageIndex为1，数组清空，吧finished改为false继续加载
      this.pageIndex = 0
      this.postList = []
      this.finished = false
      // 重新加载
      this.onLoad()
    }
  },
  watch: {
    active (value) {
      // console.log('我变化了', value)
      // 切换tab栏都重置
      this.loading = false
      this.pageIndex = 1
      this.postList = []
      this.finished = false
      this.gettabList()
      this.getpostList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
     .header{
       display: flex;
       padding: 10px;
       background-color: red;
       .left,.right{
         width: 50px;
         height: 50px;
         text-align: center;
         line-height: 50px;
         color: #fff;
         .iconnew{
         font-size: 50px;
         }
         .iconwode{
           font-size: 24px;
         }
       }
       .search{
         flex: 1;
         text-align: center;
         height: 36px;
         margin:7px 0;
         background-color: rgba(255,255,255,.5);
         border-radius: 18px;
         line-height: 36px;
         span{
           color:#fff;
           font-size: 14px;
         }
       }
     }
  }
</style>
