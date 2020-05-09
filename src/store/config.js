import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    count({ count }) {
      return count
    }
  },
  mutations: {
    setCount(state, num) {
      state.count += num
    }
  },
  actions: {}
})
