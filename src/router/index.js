import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '../views/Post.vue'
import Group from '../views/Group.vue'
import Video from '../views/Video.vue'
import Calendar from '../views/Calendar.vue'
import Coach from '../views/user-page/Coach.vue'
import Title from '../views/user-page/Title.vue'
import Config from '../views/user-page/Config.vue'
import Language from '../views/user-page/Language.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Post',
    component: Post,
    meta: { menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
    , meta: { menuOrder: 20, prevPageName: 'Post', nextPageName: 'Video' }
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
    , meta: { menuOrder: 30, prevPageName: 'Group', nextPageName: 'Calendar' }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
    , meta: { menuOrder: 40, prevPageName: 'Video', nextPageName: '' }
  },
  {
    path: '/user/coach',
    name: 'Coach',
    component: Coach
    , meta: { menuOrder: 0 }
  },
  {
    path: '/user/title',
    name: 'Title',
    component: Title
    , meta: { menuOrder: 0 }
  },
  {
    path: '/user/config',
    name: 'Config',
    component: Config
    , meta: { menuOrder: 0 }
  },
  {
    path: '/user/language',
    name: 'Language',
    component: Language
    , meta: { menuOrder: 0 }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
