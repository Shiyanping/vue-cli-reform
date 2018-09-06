import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/pushForm',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'pushForm',
        component: () => import('@/views/pushForm/index'),
        meta: { title: '推送配置', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/newsearn',
  //   component: Layout,
  //   redirect: '/newsearn/pushManagement',
  //   name: 'newsearn',
  //   meta: { title: '淘新闻文章库', icon: 'table' },
  //   children: [
  //     {
  //       path: 'pushManagement',
  //       name: 'pushManagement',
  //       component: () => import('@/views/pushManage/index'),
  //       meta: { title: '稿件管理', icon: 'example' }
  //     },
  //     {
  //       path: 'pushHistory',
  //       name: 'pushHistory',
  //       component: () => import('@/views/pushHistory/index'),
  //       meta: { title: '推送历史', icon: 'example' }
  //     },
  //     {
  //       path: 'handArticle',
  //       name: 'handArticle',
  //       component: () => import('@/views/handArticle/index'),
  //       meta: { title: '手选文章', icon: 'example' }
  //     }
  //   ]
  // },

  {
    path: '/pushManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'pushManagement',
        component: () => import('@/views/pushManage/index'),
        meta: { title: '稿件管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/pushHistory',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'pushHistory',
        component: () => import('@/views/pushHistory/index'),
        meta: { title: '推送历史', icon: 'table' }
      }
    ]
  },
  {
    path: '/handArticle',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'handArticle',
        component: () => import('@/views/handArticle/index'),
        meta: { title: '淘新闻手选文章库', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
