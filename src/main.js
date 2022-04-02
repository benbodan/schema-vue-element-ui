import Vue from 'vue'
import Example from './Examples.vue'
import components from './install'

Vue.config.productionTip = false
Vue.use(components)

new Vue({
  render: h => h(Example),
}).$mount('#app')
