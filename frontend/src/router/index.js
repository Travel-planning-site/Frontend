import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import MainPage from '@/pages/MainPage'
import LoginBoard from '@/pages/LoginBoard'
import BasicInfo from '@/pages/BasicInfo'
import ResearchPlace from '@/pages/ResearchPlace'
import InputData from '@/pages/InputData'
import KakaoMap from '@/pages/KakaoMap'
import MyPlan from '@/pages/MyPlan'
import PlanData from '@/pages/PlanData'
import ResultOfPlan from '@/pages/ResultOfPlan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/LoginBoard',
      name: 'LoginBoard',
      component: LoginBoard
    },
    {
      path: '/login'
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
    },
    {
      path: '/InputData',
      name: 'InputData',
      component: InputData
    },
    {
      path: '/KakaoMap',
      name: 'KakaoMap',
      component: KakaoMap
    },
    {
      path: '/MyPlan',
      name: 'MyPlan',
      component: MyPlan
    },
    {
      path: '/PlanData',
      name: 'PlanData',
      component: PlanData,
      props: true
    },
    {
      path: '/ResultOfPlan',
      name: 'ResultOfPlan',
      component: ResultOfPlan,
      props: true
    }
  ]
})
