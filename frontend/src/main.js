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
import ResultList from './components/ResultList'
import ResultBox from './components/ResultBox'
import SavedList from './components/SavedList'
import SavedBox from './components/SavedBox'
import KakaoMap from './components/KakaoMap'
import InputDataForm from './components/InputDataForm'

Vue.config.productionTip = false

Vue.component('main-page', MainPage)
Vue.component('basic-info', BasicInfo)
Vue.component('research-page', ResearchPlace)
Vue.component('result-list', ResultList)
Vue.component('result-box', ResultBox)
Vue.component('savedplace-list', SavedList)
Vue.component('savedplace-box', SavedBox)
Vue.component('kakao-map', KakaoMap)
Vue.component('input-data-form', InputDataForm)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
