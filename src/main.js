import Vue from 'vue'
import Example from './Examples.vue'
import components from './install'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(components);
Vue.use(ElementUI);

new Vue({
  render: h => h(Example),
}).$mount('#app')
