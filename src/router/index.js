import Vue from 'vue'
import VueRouter from 'vue-router'
import Timeline from '../views/Timeline.vue'
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
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/coach',
    name: 'Coach',
    component: Coach
  },
  {
    path: '/title',
    name: 'Title',
    component: Title
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/language',
    name: 'Language',
    component: Language
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
