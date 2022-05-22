<template>
    <div class="body">
        <b-row>
            <b-col cols="6"><input-data-form v-bind:savedListProps="savedList"></input-data-form></b-col>
            <b-col><kakao-map v-bind:savedListProps="savedList" v-bind:routesProps="routes"></kakao-map></b-col>
        </b-row>
    </div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
import KakaoMap from './KakaoMap.vue'
import axios from 'axios'

export default{
  components: { KakaoMap, InputDataForm },
  name: 'InputData',
  data () {
    return {
      savedList: [],
      routes: []
    }
  },
  created () {
    if (this.$route.params.savedList != null) {
      this.savedList = this.$route.params.savedList
      console.log(this.savedList)
      this.getKakaoNavi(this.savedList)
    }
  },
  methods: {
    async getKakaoNavi () {
      // https://cors-anywhere.herokuapp.com 접속 후 request
      // CORS 문제로 다른 사람이 만든 프록시 서버 이용, 추후 헤로쿠 사용하여 해결
      await axios.get(
        'https://cors-anywhere.herokuapp.com/https://apis-navi.kakaomobility.com/v1/directions', {
          headers: { 'Authorization': 'KakaoAK c01ebcf3f04756103db0826a158a5c21'
          },
          params: {
            origin: this.savedList[0].x + ',' + this.savedList[0].y,
            destination: this.savedList[1].x + ',' + this.savedList[1].y
          }
        }).then((res) => {
        console.log(res.data.routes)
        this.routes = res.data.routes
      })
      console.log(this.routes)
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
