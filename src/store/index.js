import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    snackbar: {},
  },
  mutations: {
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
    }
  },
  getters: {
    snackbar(state) {
      return state.snackbar;
    }
  },
  actions: {
  },
  modules: {
  }
})
