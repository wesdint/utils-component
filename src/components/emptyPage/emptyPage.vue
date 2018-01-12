<template>
  <div class="bm-empty-page">
    <img v-if="src" :src="src" alt="">
    <img v-else src="../../assert/img/empty.png" alt="">
    <div class="bm-empty-page-text">{{ text }}</div>
  </div>
</template>

<style lang="less" scoped>
  .bm-empty-page {
    padding: 44px 0;
    text-align: center;
    img {
      width: 120px;
    }
    &-text {
      padding: 8px 40px;
      color: #999;
    }
  }
</style>

<script>
  export default {
    name: 'bm-empty-page',
    props: {
      text: {
        type: String,
        default: '查找不到结果'
      },
      src: String
    }
  }
</script>