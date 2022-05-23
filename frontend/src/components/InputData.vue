<template>
    <div class="body">
        <b-row>
            <b-col cols="6"><input-data-form @msg = "getTransport" @height = "getHeight" @coordinate = "getPlace"  v-bind:savedListProps="savedList" v-bind:durationProps="duration"></input-data-form></b-col>
            <b-col><kakao-map @msg = "getDuration" v-bind:savedListProps="savedList" v-bind:transportation="transportation" v-bind:heightProp="height"></kakao-map></b-col>
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
      height: '',
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
    getHeight (height) {
      this.height = height
    },
    getPlace (msg1, msg2) {
      // for (var i = 0; i < 2; i++) {
      //   console.log(`msg${i + 1}`.x)
      //   this.positions[i][0] = msg1.x
      //   this.positions[i][1] = msg1.y
      // }
      this.positions[0][0] = msg1.y
      this.positions[0][1] = msg1.x
      this.positions[1][0] = msg2.y
      this.positions[1][1] = msg2.x
      console.log(this.positions)
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

</style>
