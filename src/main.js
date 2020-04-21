import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/loading.png')
})
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
