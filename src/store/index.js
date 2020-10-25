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
      // 0.5秒後にsnackbar表示
      setTimeout(() => {
        state.snackbar = snackbar;
      }, 500);
      // 5秒後にsnackbar非表示
      setTimeout(() => {
        state.snackbar = {
          text: '',
          appear: false,
          color: ''
        }
      }, 5000)
    },
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
