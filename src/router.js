import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Studies from './views/Studies.vue'
import MyPosts from './views/MyPosts.vue'
import Groups from './views/Groups.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/studies',
      name: 'studies',
      component: Studies
    },
    {
      path: '/myposts',
      name: 'myposts',
      component: MyPosts
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups
    }
  ]
})
