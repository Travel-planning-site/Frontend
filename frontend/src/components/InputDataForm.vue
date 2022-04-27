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
                                <b-col><b-img src="https://picsum.photos/300/200/?image=54" rounded center></b-img></b-col>
                                <b-col><b-img src="https://picsum.photos/300/200/?image=51" rounded center></b-img></b-col>
                            </b-row>
                            <b-row class="title">
                                <b-col>출발지</b-col>
                                <b-col>도착지</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="startPlace" size="lg" placeholder="출발장소" v-model="startPlace"></b-form-input></b-col>
                                <b-col><b-form-input :id="arrivalPlace" size="lg" placeholder="도착장소" v-model="arrivalPlace"></b-form-input></b-col>
                            </b-row>
                            <b-row class="title">
                                <b-col>출발시간</b-col>
                                <b-col>도착시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input :id="start_time" size="lg" placeholder="출발시간" v-model="start_time"></b-form-input></b-col>
                                <b-col><b-form-input :id="arrive_time" size="lg" placeholder="도착시간" v-model="arrive_time"></b-form-input></b-col>
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
                                    <b-form-input :id="cost" size="lg" placeholder="비용" v-model="cost"></b-form-input>
                                </b-col>
                                <b-col>
                                    <b-form-select
                                    size="lg"
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
                                <b-col><b-form-input :id="content" size="lg" placeholder="내용" v-model="content"></b-form-input></b-col>
                                <b-col><b-form-input :id="totalTime" size="lg" placeholder="총 소요시간" v-model="totalTime"></b-form-input></b-col>
                            </b-row>
                            <b-row class="title" style="margin-top: 30px;">
                                <b-col>메모</b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-textarea label class="p-2 bg-light border" id="memo" size="lg" v-model="memo" placeholder="주의사항이나 메모할 내용을 입력해주세요." rows="3" max-rows="6" no-resize></b-form-textarea>
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
      transportation: '기차',
      content: '',
      totalTime: '',
      memo: ''
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
.title {
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
.button{
    text-align: right;
}
#button {
    position: fixde;
    margin-top: 20px;
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
