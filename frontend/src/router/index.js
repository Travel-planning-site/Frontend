import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import BasicInfo from '@/components/BasicInfo'
import ResearchPlace from '@/components/ResearchPlace'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/BasicInfo',
      name: 'BasicInfo',
      component: BasicInfo
    },
    {
      path: '/ResearchPlace',
      name: 'ResearchPlace',
      component: ResearchPlace
    }
  ]
})
