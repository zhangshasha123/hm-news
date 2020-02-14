<template>
  <div class="tab-manager">
   <hm-header name="栏目管理"></hm-header>
   <div class="deTablist">
    <div class="title">点击删除以下频道(至少保留三个)</div>
     <div class="items">
     <div v-for="(item,index) in Tablist" :key="item.id" @click="del(index)" class="item">{{item.name}}</div>
     </div>
   </div>

   <div class="addTablist">
    <div class="title">点击添加以下频道</div>
     <div class="items">
     <div v-for="(item,index) in addTablist" :key="item.id" @click="add(index)" class="item">{{item.name}}</div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Tablist: [],
      addTablist: []
    }
  },
  created () {
    const Tablist = JSON.parse(localStorage.getItem('Tablist'))
    const addTablist = JSON.parse(localStorage.getItem('addTablist'))
    if (Tablist && addTablist) {
      this.Tablist = Tablist
      this.addTablist = addTablist
    } else {
      this.getTablist()
    }
  },
  methods: {

    async  getTablist () {
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.Tablist = data
      }
    },
    del (index) {
      if (this.Tablist.length <= 3) {
        return
      }
      this.addTablist.push(this.Tablist[index])
      this.Tablist.splice(index, 1)
    },
    add (index) {
      console.log('我就是你删除的', index)
      this.Tablist.push(this.addTablist[index])
      this.addTablist.splice(index, 1)
    }
  },
  watch: {
    Tablist () {
      console.log('我变化了')
      localStorage.setItem('Tablist', JSON.stringify(this.Tablist))
      localStorage.setItem('addTablist', JSON.stringify(this.addTablist))
    }
  }
}
</script>

<style lang="scss" scoped>
    .tab-manager{
      .deTablist,.addTablist{
        padding: 10px;
        .title{
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          font-weight: 700;

        }
         .items{
            overflow: hidden;
            .item{
              float: left;
              width: 70px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #ccc;
              margin-right: 15px;
              background-color: #ddd;
              margin-top: 8px;
              font-size: 14px;
            }
          }
      }
    }
</style>
