import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import vueBus from 'vue-bus'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/main.less'

Vue.use(ElementUI)
Vue.use(vueBus)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
