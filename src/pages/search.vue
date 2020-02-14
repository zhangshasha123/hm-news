<template>
  <div class="hm-search">
    <div class="header">
      <div class="left" @click="back"><i class="iconfont iconjiantou2"></i></div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" v-model="keyword">
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <div class="postList" v-if="postList.length>0">
    <hm-post v-for="item in postList" :key="item.id" :post="item"></hm-post>
    </div>

    <div class="list" v-else>
      <div class="history">
        <div class="title">历史记录</div>
        <ul class="items">
          <li class="item" v-for="item in history" :key="item.id" @click="hotSearch(item)">{{item}}</li>
        </ul>
      </div>
       <div class="history">
        <div class="title">热门搜索</div>
        <ul class="items">
          <li class="item" v-for="item in hotkey" :key="item.id" @click="hotSearch(item)">{{item}}</li>
        </ul>
      </div>
    </div>
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
      keyword: '',
      postList: [],
      isShow: false,
      history: JSON.parse(localStorage.getItem('history')) || [],
      hotkey: ['说好不哭', '阿信', '杰伦']
    }
  },
  methods: {
    async  search () {
      if (this.keyword === '') {

      } else {
        const res = await this.$axios.get('/post_search', {
          params: {
            keyword: this.keyword
          }
        })
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.postList = data
          this.history = this.history.filter(item => item !== this.keyword)
          this.history.unshift(this.keyword)
          localStorage.setItem('history', JSON.stringify(this.history))
        }
      }
    },
    hotSearch (item) {
      this.keyword = item
      this.search()
    },
    back () {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    }
  },
  watch: {
    keyword (value) {
      if (value === '') { this.postList = [] }
    }
  }
}
</script>

<style lang="scss" scoped>
    .hm-search{
      .header{
        display: flex;
        border-bottom: 1px solid #ccc;
        height: 50px;
        line-height: 50px;
        .search{
          flex:1;
          height: 34px;
          margin-top: 7px;
          border: 1px solid #ccc;
          border-radius: 17px;
          display: flex;
          padding-right: 20px;
          input{
            flex: 1;
            font-size: 12px;
            background-color: #f7f7f7;
          }
          i{
           width: 40px;
          line-height: 34px;
          text-align: center;
            }
          }
          .left,.right{
            width: 50px;
            height: 50px;
            text-align: center;
            font-size: 16px;

        }
      }
      .list{
        padding:10px 20px;

        .history{
           border-bottom: 1px solid #ccc;

          .title{
            margin-bottom: 10px;
            margin-top: 10px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            font-weight: 700;

          }
          .items{

              .item{
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
              }
            }
        }
      }
    }
</style>
