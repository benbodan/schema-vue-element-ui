import ElementUI from 'element-ui';
import Vue from 'vue';
import components from '@/install';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.config.productionTip = false

Vue.use(components, {store});
Vue.use(ElementUI);