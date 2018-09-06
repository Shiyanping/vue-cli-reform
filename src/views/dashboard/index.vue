<template>
  <div class="dashboard-container">
    <h1>Web推送后台操作介绍</h1>
    <h2>欢迎使用Web推送后台，操作需谨慎，在不确定前，一定要给自己先推一条看看情况。</h2>
    <h2>请看左侧菜单栏找到自己需要操作的项目。</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
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
