import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import { db } from '@/firebase/firebase'
import store from '@/store'


// auth
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'

// views
import Achievement from '../views/Achievement.vue'
import Auth from '../views/Auth.vue'
import FirstAccess from '../views/FirstAccess.vue'
// import Group from '../views/Group.vue'
// import GroupRoom from '../views/group/GroupRoom.vue'
import NotFound from '../views/NotFound.vue'
import Post from '../views/Post.vue'
// import Video from '../views/Video.vue'
// import VideoRoom from '../views/video/VideoRoom.vue'

// views coach page
import Coach from '../views/Coach.vue'
import CoachHome from '../views/coach/CoachHome.vue'
import SetTarget from '../views/coach/SetTarget.vue'
import CoachAppears from '../views/coach/CoachAppears.vue'
import SelectPlan from '../views/coach/SelectPlan.vue'
import MenuList from '../views/coach/MenuList.vue'
import PlanDetail from '../views/coach/PlanDetail.vue'
import Workout from '../views/coach/Workout.vue'
import CompleteWorkout from '../views/coach/CompleteWorkout.vue'

// views user page
import User from '../views/User.vue'
import CompleteSignup from '../views/CompleteSignup.vue'
// import Config from '../views/user/Config.vue'
import Profile from '../views/user/Profile.vue'
// import Language from '../views/user/Language.vue'
import SetIcon from '../views/user/SetIcon.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/first-access',
    name: 'FirstAccess',
    component: FirstAccess,
    meta: { pageHierarchy: 10, menuOrder: 0 }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { pageHierarchy: 10, menuOrder: 0 },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { pageHierarchy: 10, menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
      },
      {
        path: 'signup',
        name: 'Signup',
        component: Signup,
        meta: { pageHierarchy: 10, menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
      },
    ]
  },
  {
    path: '/complete-signup',
    name: 'CompleteSignup',
    component: CompleteSignup
    , meta: { pageHierarchy: 10, menuOrder: 0 }
  },


  {
    path: '/',
    name: 'Post',
    component: Post,
    meta: { pageHierarchy: 20, menuOrder: 10, prevPageName: '', nextPageName: 'Group' }
  },
  // {
  //   path: '/group',
  //   name: 'Group',
  //   component: Group,
  //   meta: { pageHierarchy: 20, menuOrder: 20, prevPageName: 'Post', nextPageName: 'Video' }
  // },
  // {
  //   path: '/group/room/:id',
  //   name: 'GroupRoom',
  //   component: GroupRoom,
  //   meta: { pageHierarchy: 25, menuOrder: 20, prevPageName: 'Post', nextPageName: 'Video' }
  // },
  // {
  //   path: '/video',
  //   name: 'Video',
  //   component: Video,
  //   meta: { pageHierarchy: 20, menuOrder: 30, prevPageName: 'Group', nextPageName: 'Achievement' }
  // },
  // {
  //   path: '/video/room/:id',
  //   name: 'VideoRoom',
  //   component: VideoRoom,
  //   meta: { pageHierarchy: 45, menuOrder: 30, prevPageName: 'Group', nextPageName: 'Achievement' }
  // },
  {
    path: '/achievement',
    name: 'Achievement',
    component: Achievement,
    meta: { pageHierarchy: 20, menuOrder: 40, prevPageName: 'Video', nextPageName: '' }
  },
  {
    path: '/coach',
    // name: 'Coach',
    component: Coach,
    meta: { pageHierarchy: 30, menuOrder: 0 },
    props: true,
    children: [
      {
        path: '/',
        name: 'CoachHome',
        component: CoachHome,
        meta: { pageHierarchy: 30, navLabel: '未来コーチ' }
      },
      {
        path: 'set-target',
        name: 'SetTarget',
        component: SetTarget,
        meta: { pageHierarchy: 35, navLabel: '目標設定', zAuto: true }
      },
      {
        path: 'select-plan',
        name: 'SelectPlan',
        component: SelectPlan,
        meta: { pageHierarchy: 40, navLabel: 'プラン選択' }
      },
      {
        path: 'coach-appears',
        name: 'CoachAppears',
        component: CoachAppears,
        meta: { pageHierarchy: 47, navLabel: '未来コーチ' }
      },
      {
        path: 'plan-detail',
        name: 'PlanDetail',
        component: PlanDetail,
        meta: { pageHierarchy: 45, navLabel: 'プラン確認', props: true, zAuto: true }
      },
      {
        path: 'menu-list',
        name: 'MenuList',
        component: MenuList,
        meta: { pageHierarchy: 50, navLabel: 'メニュー確認', props: { day: false }, zAuto: true }
      },
      {
        path: 'workout',
        name: 'Workout',
        component: Workout,
        meta: { pageHierarchy: 55, navLabel: 'メニュー', props: true, zAuto: true  }
      },
      {
        path: 'complete-workout',
        name: 'CompleteWorkout',
        component: CompleteWorkout,
        meta: { pageHierarchy: 55, navLabel: 'トレーニング完了', props: true }
      },
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { pageHierarchy: 80, menuOrder: 0 },
    children: [
      {
        path: 'profile',
        name: 'MyProfile',
        component: Profile,
        meta: { pageHierarchy: 80, navLabel: 'プロフィール' }
      },
      {
        path: 'profile/:id',
        name: 'FriendProfile',
        component: Profile
        , meta: { pageHierarchy: 80, navLabel: '' }
      },

      {
        path: 'set-icon',
        name: 'SetIcon',
        component: SetIcon,
        meta: { pageHierarchy: 85, navLabel: 'アイコン設定' }
      },
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: { pageHierarchy: 0, menuOrder: 0 }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log('to, from, next:', to, from);
  firebase.auth().onAuthStateChanged(async (authUser) => {
    // console.log('authUser:', authUser);
    if (authUser && !store.state.user.username) {
      // console.log('store.state.user:', store.state.user);
      await db.collection('users').doc(authUser.uid).get().then(doc => {
        // console.log('doc.data():', doc.data());
        authUser = Object.assign(doc.data(), authUser);
        // console.log('authUser:', authUser);
        // authUser.username = doc.data().username;
        // authUser.useremail = doc.data().email;
        // authUser.userIcon = doc.data().userIcon;
      });
      store.commit('setUser', authUser);

      // console.log('store.state.user:', store.state.user);
      // console.log('store.state.user.username:', store.state.user.username);
    }

    if (!authUser && store.state.user.username) {
      console.log('set user null:', );
      store.commit('setUser', {});
    }
    next()
    // console.log('authUser:', authUser);
  })
})

export default router
