<template>
    <div class="body">
        <b-row>
            <b-col cols="6">
              <input-data-form id="inputForm"
                @msg="getTransport"
                @coordinate="getPlace"
                v-bind:savedListProps="savedList"
                v-bind:idxProp="idx"
                v-bind:durationProps="duration">
              </input-data-form>
            </b-col>
            <b-col>
              <kakao-map
                @msg="getDuration"
                v-bind:savedListProps="savedList"
                v-bind:transportation="transportation">
              </kakao-map>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
import KakaoMap from './KakaoMap.vue'
import {EventBus} from '../main'
export default{
  components: { KakaoMap, InputDataForm },
  name: 'InputData',
  data () {
    return {
      savedList: [],
      transportation: '',
      duration: '',
      positions: [
        [0, 0],
        [0, 0]
      ]
    }
  },
  created () {
    if (this.$route.params.savedList != null) {
      this.savedList = this.$route.params.savedList
      this.idx = this.$route.params.idx
      // console.log(this.savedList)
    }
  },
  mounted () {
  },
  methods: {
    getTransport (msg) {
      this.transportation = msg
    },
    getDuration (msg) {
      this.duration = msg
    },
    getPlace (startObj, arriveObj) {
      this.positions[0][1] = startObj.placeX
      this.positions[0][0] = startObj.placeY
      this.positions[1][1] = arriveObj.placeX
      this.positions[1][0] = arriveObj.placeY
      EventBus.$emit('push-positions', this.positions)
    }
  },
  watch: {
    positions: function () {
      console.log(this.positions)
    }
  }
}
</script>

<style scoped>
#inputForm {
    background-color: rgb(246, 239, 239);
    height: auto;

}
</style>
