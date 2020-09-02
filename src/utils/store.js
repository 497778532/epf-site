
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    homeTree: {},
    tabs: [{ path: '/', query: {}, name: '首页' }],
    card: {
      tender: true,
      appeal: true,
    },
    keepAlive: ['government'],
    advertising: true

  },
  getters: {
    // state的计算属性
  },
  mutations: {
    init_keepAlive (state, data) {
      state.keepAlive = []
      state.keepAlive.push('government')
    },
    delete_keepAlive (state, data) {
      state.keepAlive = []
      // state.keepAlive.pop()
    },
    init_tree (state, data) {
      state.homeTree = data
    },
    back_tabs (state, data) {
      state.tabs = data
    },
    add_tabs (state, data) {
      state.tabs.push(data)
    },
    delete_tabs (state, data) {
      console.log(state, data)
      let index = state.tabs.findIndex(function (item) {
        return item === data;
      })
      state.tabs.splice(index + 1);
    },
    init_tabs (state, data) {
      state.tabs = [data]
    },
    replace_tabs (state, data) {
      state.tabs.pop();
      this.commit('add_tabs', data)
      // state.tabs[state.tabs.length - 1] = data

    },


    close_advertising (state) {
      state.advertising = false
    },
    close_card (state, data) {
      state.card[data] = false
    }
  },
  actions: {
    // 提交mutation，异步操作
  },
});
export default store