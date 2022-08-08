import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
// 窗口自适应
import 'lib-flexible'
import axios from 'axios'
import store from './store'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
