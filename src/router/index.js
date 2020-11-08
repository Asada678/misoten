import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import {db} from '@/firebase/firebase'
import store from '@/store'


// auth
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
// views
import Calendar from '../views/Calendar.vue'
import FirstAccess from '../views/FirstAccess.vue'
import Group from '../views/Group.vue'
import GroupRoom from '../views/group/GroupRoom.vue'
import NotFound from '../views/NotFound.vue'
import Post from '../views/Post.vue'
import Video from '../views/Video.vue'
// views user page
import Coach from '../views/user/Coach.vue'
import CompleteSignup from '../views/CompleteSignup.vue'
import Config from '../views/user/Config.vue'
import Profile from '../views/user/Profile.vue'
import Language from '../views/user/Language.vue'
import SetIcon from '../views/user/SetIcon.vue'
import SetTarget from '../views/user/SetTarget.vue'
import Title from '../views/user/Title.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/first-access',
    name: 'FirstAccess',
    component: FirstAccess,
    meta: { pageHierarchy: 10, menuOrder: 0 }
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
    path: '/complete-signup',
    name: 'CompleteSignup',
    component: CompleteSignup
    , meta: { pageHierarchy: 10, menuOrder: 0 }
  },
  {
    path: '/user/set-target',
    name: 'SetTarget',
    component: SetTarget
    , meta: { pageHierarchy: 10, menuOrder: 0 }
  },
  {
    path: '/user/set-icon',
    name: 'SetIcon',
    component: SetIcon
    , meta: { pageHierarchy: 40, menuOrder: 0 }
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
    path: '/group/room/:id',
    name: 'GroupRoom',
    component: GroupRoom
    , meta: { pageHierarchy: 25, menuOrder: 20, prevPageName: 'Post', nextPageName: 'Video' }
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
    path: '/user/profile',
    name: 'Profile',
    component: Profile
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
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
    , meta: { pageHierarchy: 0, menuOrder: 0 }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log('to, from, next:', to, from);
  firebase.auth().onAuthStateChanged(async (authUser) => {
    console.log('authUser:', authUser);
    if(authUser && !store.state.user.username) {
      // console.log('store.state.user:', store.state.user);
      await db.collection('users').doc(authUser.uid).get().then(doc => {
        // console.log('doc.data():', doc.data());
        authUser.username = doc.data().username;
        authUser.useremail = doc.data().email;
        authUser.userIcon = doc.data().userIcon;
      });
      store.commit('setUser', authUser);
      
      // console.log('store.state.user:', store.state.user);
      // console.log('store.state.user.username:', store.state.user.username);
    }
    
    if(!authUser && store.state.user.username) {
      store.commit('setUser', {});
    }
      next()
    // console.log('authUser:', authUser);
  })
})

export default router
