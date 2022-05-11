<template>
    <div class="body">
        <b-container class="container">
            <b-row>
                <b-col class="left">
                    <b-row id="sidebar">
                        <b-col cols="12" md="auto"><b-button v-b-toggle.sidebar-1></b-button>
                            <b-sidebar id="sidebar-1" title="저장된 장소들" shadow>
                                <div>
                                    <savedplace-box v-for="(saved, index) in savedListProps" :key="index" :selectedBox="saved" style="text-align: center;"></savedplace-box>
                                </div>
                            </b-sidebar>
                        </b-col>
                        <b-col>Where - date</b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row style="margin-bottom: 40px;">
                                <b-col style="text-align: center;"><img :src="startPlaceImg" id="img"></b-col>
                                <b-col style="text-align: center;"><img :src="arrivalPlaceImg" id="img"></b-col>
                            </b-row>
                            <b-row class="title">
                                <b-col>출발지</b-col>
                                <b-col>도착지</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="startPlace" placeholder="출발장소" v-model="startPlace"></b-form-input></b-col>
                                <b-col><b-form-input :id="arrivalPlace" placeholder="도착장소" v-model="arrivalPlace"></b-form-input></b-col>
                            </b-row>
                            <b-row class="title">
                                <b-col>출발시간</b-col>
                                <b-col>도착시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="start_time"  placeholder="출발시간" v-model="start_time"></b-form-input></b-col>
                                <b-col><b-form-input :id="arrive_time" placeholder="도착시간" v-model="arrive_time"></b-form-input></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row class="title">
                                <b-col>비용</b-col>
                                <b-col>이동수단</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col>
                                    <b-form-input :id="cost"  placeholder="비용" v-model="cost"></b-form-input>
                                </b-col>
                                <b-col>
                                    <b-form-select
                                    :options="['기차', '렌트카', '비행기', '택시', '도보']"
                                    v-model="transportation"
                                ></b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="title">
                                <b-col>내용</b-col>
                                <b-col>소요 시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="content"  placeholder="내용" v-model="content"></b-form-input></b-col>
                                <b-col><b-form-input :id="totalTime"  placeholder="총 소요시간" v-model="totalTime"></b-form-input></b-col>
                            </b-row>
                            <b-row class="title" style="margin-top: 20px;">
                                <b-col>메모</b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-textarea  class="mt-2" id="memo"  v-model="memo" placeholder="주의사항이나 메모할 내용을 입력해주세요." ></b-form-textarea>
                                </b-col>
                            </b-row>
                            <b-row class="button">
                                <b-col><b-button id="button" @click="onClick">입력완료</b-button></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import axios from 'axios'
import ResultBox from './ResultBox.vue'
// import {EventBus} from '../main'
export default{
  components: { ResultBox },
  name: 'InputData',
  props: {
    savedListProps: Array
  },
  data () {
    return {
      startPlace: '',
      arrivalPlace: '',
      start_time: '',
      arrive_time: '',
      cost: '',
      transportation: '기차',
      content: '',
      totalTime: '',
      memo: '',
      placeImg: '',
      startPlaceImg: '',
      arrivalPlaceImg: ''
    }
  },
  methods: {
    sidebar: function () {
      alert('sidebar')
    },
    onClick: function () {
      console.log(this.startPlace)
      console.log(this.arrivalPlace)
      console.log(this.start_time)
      console.log(this.arrive_time)
      console.log(this.cost)
      console.log(this.transportation)
      console.log(this.content)
      console.log(this.totalTime)
      console.log(this.memo)
    },
    setTitle: function (savedList) {
      this.startPlace = savedList[0].place_name
      this.arrivalPlace = savedList[1].place_name
    },
    getImage: function (placeName, num) {
      axios.get(
        'https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/image?query=' + placeName, {
          headers: {
            'X-Naver-Client-Id': 'o9H6ct1KNCA_QMfWXbtT',
            'X-Naver-Client-Secret': 'kRkOfXCxP2'
          }
        }).then((res) => {
        this.placeImg = res.data.items[0].thumbnail
        if (num === 1) this.startPlaceImg = this.placeImg
        if (num === 2) this.arrivalPlaceImg = this.placeImg
      })
    }
  },
  created () {
    this.setTitle(this.savedListProps)
    this.getImage(this.startPlace, 1)
    this.getImage(this.arrivalPlace, 2)
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'yg-jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.title {
    font-family: yg-jalnan;

}
.margin {
    margin-bottom: 30px;
}

.left {
    padding: 0 30px 30px 30px;
    height: auto;
    margin-top: 20px;
    padding-bottom: 30px;
    background-color: rgb(240, 228, 255);
}
.button{
    text-align: right;
}
#button {
    margin-top: 20px;
    bottom : 130px;
    width : 90px;
    right : 30px;
    border: 5px;
}
#sidebar {
    margin-bottom: 40px;
    background-color: rgba(226, 213, 247, 0.943);
}
#img {
    width: 400px;
    height: 300px;
}
</style>
