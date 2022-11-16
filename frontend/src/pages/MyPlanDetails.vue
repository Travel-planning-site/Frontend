<template>
    <div>
      <b-button style="margin-right:30px; margin-top:30px; float:right;" @click="$router.push('/MyPlan')">
        <b-icon font-scale="2" icon="arrow-left-square">
        </b-icon>
      </b-button>
      <b-container>
            <b-row>
              <b-col cols="11" style="margin-bottom: 30px;">
                <div class="dayBox">
                  <span id="day">
                    1일차
                  </span>
                </div>
              </b-col>
            </b-row>
            <b-row style="padding-top: 50px;">
                <b-col cols="4" v-for="(plan, index) in plans" :key="index">
                    <b-card
                      :title= "`${index+1}번째 계획`"
                      :img-src="`${plan.startPlaceImg}`"
                      img-alt="Image"
                      img-height="221"
                      img-width="318"
                      img-top
                      tag="article"
                      style="max-width: 20rem;"
                      class="mb-2">
                      <b-card-text>
                          출발지: {{plan.startPlace}} <br/>
                          도착지: {{plan.arrivalPlace}} <br/>
                          이동수단: {{plan.transportation}} <br/>
                          총 비용: {{plan.commaCost}} <br/>
                          총 소요시간: {{plan.totalTime}}
                      </b-card-text>
                    </b-card>
                    <br/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default{
  name: 'MyPlanDetails',
  data () {
    return {
      plans: [],
      plan: {
        startPlaceImg: '',
        arrivalPlaceImg: '',
        startPlace: '',
        arrivalPlace: '',
        costArray: '',
        cost: Number,
        startTime: '',
        arriveTime: '',
        transportation: '',
        totalTime: '',
        memo: '',
        commaCost: String
      }
    }
  },
  created () {
    this.plans = this.$route.params.travels
    this.getCommaCost(this.plans)
    console.log(this.plans)
  },
  mounted () {
  },
  methods: {
    getTransport (msg) {
    },
    getCommaCost (plans) {
      for (var i = 0; i < plans.length; i++) {
        this.plans[i].commaCost = this.plans[i].cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
      }
    }
  },
  watch: {
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
#day {
    color: #45e0e6;
}
.dayBox {
  font-size: 300%;
  margin-top: 10px;
  margin-left: 10px;
  font-family: twayfly;
}

</style>
