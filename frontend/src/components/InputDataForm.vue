<template>
    <div class="body">
        <b-container class="container">
            <b-row>
                <b-col class="left">
                    <b-row id="sidebar">
                        <b-col><b-button @click="sidebar()"><b-icon icon="forward-fill"></b-icon></b-button></b-col>
                        <b-col>Where - date</b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row style="margin-bottom: 30px;">
                                <b-col><b-img src="https://picsum.photos/370/200/?image=54" rounded center></b-img></b-col>
                                <b-col><b-img src="https://picsum.photos/370/200/?image=51" rounded center></b-img></b-col>
                            </b-row>
                            <b-row>
                                <b-col>출발지</b-col>
                                <b-col>도착지</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="startPlace" size="lg" placeholder=" " v-model="startPlace"></b-form-input></b-col>
                                <b-col><b-form-input :id="arrivalPlace" size="lg" placeholder=" " v-model="arrivalPlace"></b-form-input></b-col>
                            </b-row>
                            <b-row>
                                <b-col>출발시간</b-col>
                                <b-col>도착시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="start_time" size="lg" placeholder=" " v-model="start_time"></b-form-input></b-col>
                                <b-col><b-form-input :id="arrive_time" size="lg" placeholder=" " v-model="arrive_time"></b-form-input></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row>
                                <b-col>비용</b-col>
                                <b-col>이동수단</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="cost" size="lg" placeholder=" " v-model="cost"></b-form-input></b-col>
                                <b-col><b-form-input :id="transportation" size="lg" placeholder=" " v-model="transportation"></b-form-input></b-col>
                            </b-row>
                            <b-row>
                                <b-col>내용</b-col>
                                <b-col>소요 시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="content" size="lg" placeholder=" " v-model="content"></b-form-input></b-col>
                                <b-col><b-form-input :id="totalTime" size="lg" placeholder=" " v-model="totalTime"></b-form-input></b-col>
                            </b-row>
                            <b-row style="margin-top: 30px;">
                                <b-col>메모</b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-textarea label class="p-2 bg-light border" id="memo" size="lg" v-model="memo" placeholder="메모" rows="3" max-rows="6" no-resize></b-form-textarea>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-button id="button">입력완료</b-button>

        </b-container>
    </div>
</template>

<script>
import KakaoMap from './KakaoMap.vue'

export default{
  components: { KakaoMap },
  name: 'InputData',
  data () {
    return {
      startPlace: '',
      arrivalPlace: '',
      start_time: '',
      arrive_time: '',
      cost: '',
      transportation: '',
      content: '',
      totalTime: '',
      memo: ''
    }
  },
  methods: {
    sidebar: function () {
      alert('sidebar')
    }
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
.body {
    font-family: yg-jalnan;

}
.margin {
    margin-bottom: 20px;
}

.left {
    height: auto;
    margin-top: 30px;
    padding-bottom: 30px;
    background-color: rgb(240, 228, 255);
}

#button {
    position : fixed;
    bottom : 130px;
    width : 90px;
    right : 30px;
    border: 5px;
}
#sidebar {
    margin-bottom: 30px;
    background-color: rgba(226, 213, 247, 0.943);
}
</style>
