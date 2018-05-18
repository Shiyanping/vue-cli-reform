<template>
  <div id="container">
    <h1>Hello</h1>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello';
import axios from 'axios';
import utils from '@js/utils';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    Hello
  },
  data() {
    return {
      lastCity: ''
    };
  },
  computed: {
    ...mapState(['city'])
  },
  mounted() {
    this.lastCity = this.city;
    this.getHomeInfo();
    // 使用utils里面的方法
    console.log(utils.getUrlParam(location.href, 'userId'));
  },
  methods: {
    getHomeInfo() {
      // 使用axios调取接口，dev上本地mock或者是链接后端的dev环境
      axios
        .get('/api/indexInfo?city=' + this.city)
        .then(this.getHomeInfoSucc)
        .catch(error => {
          console.log(error);
        });
    },
    getHomeInfoSucc(res) {
      console.log(res);
    }
  }
};
</script>

<style lang="stylus">
#container
  background #f5f5f5
</style>
