// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import MainPage from './components/MainPage'
import BasicInfo from './components/BasicInfo'
import ResearchPlace from './components/ResearchPlace'

Vue.config.productionTip = false

Vue.component('main-page', MainPage)
Vue.component('basic-info', BasicInfo)
Vue.component('research-page', ResearchPlace)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
