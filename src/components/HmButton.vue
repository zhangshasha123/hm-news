<template>
  <div class="HmButton" @click="hmBtn"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    hmBtn (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
.HmButton{
  height: 48px;
  line-height: 48px;
  background-color: #c30;
  text-align: center;
  border-radius: 24px;
  font-size: 18px;
  color: #fff;
}
</style>
