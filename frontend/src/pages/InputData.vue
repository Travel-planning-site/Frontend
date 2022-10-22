<template>
    <div class="body">
        <b-row>
            <b-col cols="6">
              <input-data-form id="inputForm"
                @msg = "getTransport"
                @coordinate = "getPlace"
                v-bind:savedListProps="savedList"
                v-bind:durationProps="duration">
              </input-data-form>
            </b-col>
            <b-col>
              <kakao-map
                @msg = "getDuration"
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
      console.log(this.savedList)
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
      for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
          this.positions[i][j] = startObj.placeX
          this.positions[i][j] = arriveObj.placeY
        }
        // console.log(`msg${i + 1}`.x)
      }
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
    background-color: rgb(240, 228, 255);
    height: auto;

}
</style>
