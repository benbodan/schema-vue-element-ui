import Vue from 'vue'
import Example from './Examples.vue'
import components from './install'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
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

new Vue({
  render: h => h(Example),
}).$mount('#app')

