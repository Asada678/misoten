import Vue from 'vue'
import VueRouter from 'vue-router'
import Timeline from '../views/Timeline.vue'
import Group from '../views/Group.vue'
import Video from '../views/Video.vue'
import Calendar from '../views/Calendar.vue'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
