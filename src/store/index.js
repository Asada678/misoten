import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    snackbar: {},
    snackbarTimeout: null,
    eventType: null,
    groupDialog: false,
    postDialog: false,
    videoRoomDialog: false,
    planDialog: false,
    completeMenu: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateUser(state, options) {
      state.user = Object.assign(state.user, options);
    },
    setSnackbar(state, snackbar) {
      clearTimeout(state.snackbarTimeout);
      snackbar = {
        ...snackbar,
        appear: true
      }
      // 0.1秒後にsnackbar表示
      state.snackbarTimeout = setTimeout(() => {
        state.snackbar = snackbar;
      }, 100);
      // 5秒後にsnackbar非表示
      state.snackbarTimeout = setTimeout(() => {
        state.snackbar = {
          text: '',
          appear: false,
          color: ''
        }
      }, 5000);
    },
    closeSnackbar(state) {
      const snackbar = {
        text: "",
        appear: false,
        color: "",
      };
      state.snackbar = snackbar;
    },
    setEventType(state, eventType) {
      state.eventType = eventType;
    },
    setGroupDialog(state, groupDialog) {
      state.groupDialog = groupDialog;
    },
    setPostDialog(state, postDialog) {
      state.postDialog = postDialog;
    },
    setVideoRoomDialog(state, videoRoomDialog) {
      state.videoRoomDialog = videoRoomDialog;
    },
    setPlanDialog(state, planDialog) {
      state.planDialog = planDialog;
    },
    isAuthenticated(state) {
      // console.log('is authenticated:',);
      if (!state.user.username) {
        console.log('this:', this);
        const snackbar = {
          text: "ログインしてください。",
          appear: true,
          color: "red",
        };
        state.snackbar = snackbar;
        setTimeout(() => {
          state.snackbar = {
            text: '',
            appear: false,
            color: ''
          }
        }, 5000);
        return false;
      }
    },
    setCompleteMenu(state, completeMenu) {
      state.completeMenu = completeMenu;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    snackbar(state) {
      return state.snackbar;
    },
    eventType(state) {
      return state.eventType;
    },
    groupDialog(state) {
      return state.groupDialog;
    },
    postDialog(state) {
      return state.postDialog;
    },
    videoRoomDialog(state) {
      return state.videoRoomDialog;
    },
    planDialog(state) {
      return state.planDialog;
    },
    completeMenu(state) {
      return state.completeMenu;
    },
  },
  actions: {
  },
  modules: {
  }
})
