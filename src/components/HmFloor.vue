<template>
 <div class="wrapper">
 <hm-floor v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>
  <div class="hm-floor">
    <div class="header">
     <div class="time">
        <span>{{comment.user.nickname}}</span>
        <span>{{comment.create_date|time('YYYY-MM-DD HH:mm:ss')}}</span>
     </div>
      <div class="reply" @click="reply(comment.id)">回复</div>
    </div>
    <div class="post">{{comment.content}}</div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="scss" scoped>
    .hm-floor{
      border: 1px solid #ccc;
      background-color: #ddd;
      .header{
        display:flex;
        padding:10px 20px;
        justify-content: space-between;
        .time{
          span:first-child{
            font-size: 14px;
            margin-right: 5px;
          }
        }
      }
      .post{
          padding: 0 20px;
          font-size: 14px;
          margin-bottom: 10px;
        }
    }
</style>
