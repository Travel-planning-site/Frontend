<template>
    <div class="body">
        <b-row>
            <b-col cols="6"><input-data-form @msg = "getTransport" @height = "getHeight" v-bind:savedListProps="savedList" v-bind:durationProps="duration"></input-data-form></b-col>
            <b-col><kakao-map @msg = "getDuration" v-bind:savedListProps="savedList" v-bind:transportation="transportation" v-bind:heightProp="height"></kakao-map></b-col>
        </b-row>
    </div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
import KakaoMap from './KakaoMap.vue'

export default{
  components: { KakaoMap, InputDataForm },
  name: 'InputData',
  data () {
    return {
      savedList: [],
      transportation: '',
      duration: '',
      height: ''
    }
  },
  created () {
    if (this.$route.params.savedList != null) {
      this.savedList = this.$route.params.savedList
      console.log(this.savedList)
    }
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
    }
  },
  watch: {
    routes: function () {
      this.routes = this.routes
    }
  }
}
</script>

<style scoped>

</style>
