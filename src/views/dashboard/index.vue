<template>
  <div class="dashboard-container">
    欢迎使用该系统，系统主要 fork 于
    <a href="https://panjiachen.github.io/vue-element-admin-site/zh/">vue-element-admin</a>
    其中有更加详细的文档，复杂的功能可以进入该文档查看
    <p>当前时间：{{ date }}</p>
  </div>
</template>

<script>
import { formatTime } from '@/utils';
export default {
  name: 'Dashboard',
  data() {
    return {
      date: ''
    };
  },
  created() {
    this.date = formatTime(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss');
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
