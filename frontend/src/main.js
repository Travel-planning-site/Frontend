// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
// import AxiosPlugin from 'vue-axios-cors'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import MainPage from './pages/MainPage'
import LoginBoard from './pages/LoginBoard'
import BasicInfo from './pages/BasicInfo'
import ResearchPlace from './pages/ResearchPlace'
import DaumSearch from './pages/DaumSearch'
import ResultList from './pages/ResultList'
import ResultBox from './pages/ResultBox'
import SavedList from './pages/SavedList'
import SavedBox from './pages/SavedBox'
import Pagination from './pages/Pagination'
import KakaoMap from './pages/KakaoMap'
import InputDataForm from './pages/InputDataForm'
import MyPlan from './pages/MyPlan'
import MyPlanBox from './pages/MyPlanBox'
import SidebarBox from './pages/SidebarBox'

export const EventBus = new Vue()

Vue.config.productionTip = false

Vue.component('main-page', MainPage)
Vue.component('login-board', LoginBoard)
Vue.component('basic-info', BasicInfo)
Vue.component('research-page', ResearchPlace)
Vue.component('daum-search', DaumSearch)
Vue.component('result-list', ResultList)
Vue.component('result-box', ResultBox)
Vue.component('savedplace-list', SavedList)
Vue.component('savedplace-box', SavedBox)
Vue.component('pagination', Pagination)
Vue.component('kakao-map', KakaoMap)
Vue.component('input-data-form', InputDataForm)
Vue.component('my-plan', MyPlan)
Vue.component('my-plan-box', MyPlanBox)
Vue.component('sidebar-box', SidebarBox)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
// Vue.use(AxiosPlugin)

Vue.$cookies.config('7d')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
