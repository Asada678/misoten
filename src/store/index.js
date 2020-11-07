import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    snackbar: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateUser(state, options) {
      state.user = Object.assign(state.user, options);
    },
    setSnackbar(state, snackbar) {
      snackbar = {
        ...snackbar,
        appear: true
      }
      // 0.1秒後にsnackbar表示
      setTimeout(() => {
        state.snackbar = snackbar;
      }, 100);
      // 5秒後にsnackbar非表示
      setTimeout(() => {
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
    isAuthenticated(state) {
      console.log('is authenticated:',);
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
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    snackbar(state) {
      return state.snackbar;
    },
  },
  actions: {
  },
  modules: {
  }
})
