<template>
  <el-menu 
    class="navbar" 
    mode="horizontal">
    <hamburger 
      :toggle-click="toggleSideBar" 
      :is-active="sidebar.opened" 
      class="hamburger-container" />
    <breadcrumb />
    <el-dropdown 
      class="avatar-container" 
      trigger="click">
      <div class="avatar-wrapper">
        <img 
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" 
          class="user-avatar">
        <span>{{ userName }}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu 
        slot="dropdown" 
        class="user-dropdown">
        <router-link 
          class="inlineBlock" 
          to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userName: localStorage.getItem('ADMIN_USERNAME')
    };
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 100%;
    display: inline-flex;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        font-size: 12px;
      }
    }
  }
}
</style>

