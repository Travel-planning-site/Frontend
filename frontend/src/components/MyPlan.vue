<template>
  <div class="MyPlan">
    <b-container fluid>
      <b-row align-v="start">
        <b-col cols="12" md="auto" style="margin-bottom: 30px;">
          <div class="nameBox"><span id="userName">{{userName}}</span> 님의 여행 계획</div>
        </b-col>
      </b-row>
      <b-row cols="4">
        <b-col v-for="(box, index) in boxlist" :key="index">
          <my-plan-box style="margin-bottom: 20px;"></my-plan-box>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MyPlanBox from './MyPlanBox.vue'
export default {
  components: { MyPlanBox },
  name: 'MyPlan',
  data () {
    return {
      userName: '사용자',
      boxlist: 5
    }
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'twayfly';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayfly.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  body {
    margin: 0;
  }
  .MyPlan {
    padding: 2%;
    width: 100vw;
    height: 100vh;
  }
  #userName {
    color: #318bdc;
  }
  .nameBox {
    text-decoration: double underline;
    text-underline-position: under;
    font-size: 300%;
    margin-top: 10px;
    margin-left: 10px;
    font-family: twayfly;
  }

</style>
