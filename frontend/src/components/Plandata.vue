<template>
    <div>
        <b-container >
            <b-row><h4>1일차</h4></b-row>
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
                class="mb-2"
            >
                <b-card-text>
                    출발지: {{plan.startPlace}} <br/>
                    도착지: {{plan.arrivalPlace}} <br/>
                    이동수단: {{plan.transportation}} <br/>
                    총 비용: {{plan.totalCost}} <br/>
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
  name: 'PlanData',
  data () {
    return {
      plans: [],
      plan: {
        startPlaceImg: '',
        arrivalPlaceImg: '',
        startPlace: '',
        arrivalPlace: '',
        costArray: '',
        totalCost: Number,
        startTime: '',
        arriveTime: '',
        transportation: '',
        totalTime: '',
        memo: ''
      }
    }
  },
  created () {
    this.plans = this.$route.params.plans
    console.log(this.plans)
  },
  mounted () {
  },
  methods: {
    getTransport (msg) {
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
