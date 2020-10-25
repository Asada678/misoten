import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import FirstAccess from '../views/FirstAccess.vue'
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
    path: '/first-access',
    name: 'FirstAccess',
    component: FirstAccess,
    meta: { pageHierarchy: 0, menuOrder: 0 }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { pageHierarchy: 10, menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { pageHierarchy: 10, menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
  },
  {
    path: '/',
    name: 'Post',
    component: Post,
    meta: { pageHierarchy: 20, menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
    , meta: { pageHierarchy: 20, menuOrder: 20, prevPageName: 'Post', nextPageName: 'Video' }
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
    , meta: { pageHierarchy: 20, menuOrder: 30, prevPageName: 'Group', nextPageName: 'Calendar' }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
    , meta: { pageHierarchy: 20, menuOrder: 40, prevPageName: 'Video', nextPageName: '' }
  },
  {
    path: '/user/coach',
    name: 'Coach',
    component: Coach
    , meta: { pageHierarchy: 40, menuOrder: 0 }
  },
  {
    path: '/user/title',
    name: 'Title',
    component: Title
    , meta: { pageHierarchy: 40, menuOrder: 0 }
  },
  {
    path: '/user/config',
    name: 'Config',
    component: Config
    , meta: { pageHierarchy: 40, menuOrder: 0 }
  },
  {
    path: '/user/language',
    name: 'Language',
    component: Language
    , meta: { pageHierarchy: 40, menuOrder: 0 }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
