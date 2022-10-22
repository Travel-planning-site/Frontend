import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import LoginBoard from '@/components/LoginBoard'
import BasicInfo from '@/components/BasicInfo'
import ResearchPlace from '@/components/ResearchPlace'
import InputData from '@/components/InputData'
import KakaoMap from '@/components/KakaoMap'
import MyPlan from '@/components/MyPlan'
import PlanData from '@/components/PlanData'
import ResultOfPlan from '@/components/ResultOfPlan'

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
