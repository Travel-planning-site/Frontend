<template>
<div>
    <b-container class="BasicInfo">
      <b-row id="Page_name">
        여행정보 입력
      </b-row>
      <div class="body">
        <b-row><b-col>Title</b-col></b-row>
            <b-row>
              <b-col id="title"><b-form-input :id="title" size="lg" placeholder="여행 제목" v-model="title"></b-form-input></b-col>
            </b-row>
            <b-row>
              <b-col class="text">Where</b-col>
            </b-row>
            <b-row>
                <b-col id="place">
                    <b-form-input :id="place" size="lg" placeholder="여행 장소" v-model="place"></b-form-input>
                </b-col>
            </b-row>
            <b-row><b-col class="text">Who</b-col></b-row>
            <b-row >
                <b-col id="people"><b-form-input :id="people" size="lg" placeholder="여행 동반자" v-model="people"></b-form-input></b-col>
            </b-row>
            <b-row><b-col class="text">How long</b-col></b-row>
            <b-row>
                <b-col id="period"><b-form-input :id="period" size="lg" placeholder="여행 기간" v-model="period"></b-form-input></b-col>
            </b-row>
            <b-row><b-col class="text">메모</b-col></b-row>
            <b-row>
                <b-col id="memo">
                    <b-form-textarea label class="p-2 bg-light border" id="memo" size="lg" v-model="memo" placeholder="주의사항" rows="3" max-rows="6" no-resize></b-form-textarea>
                </b-col>
            </b-row>
            <b-row>
              <b-col id="buttons">
                <b-button id="cancle" @click="$router.push('/')">Cancle</b-button>
                <b-button id="next" @click="[onClickInfo(),$router.push('ResearchPlace')]">Next</b-button>
              </b-col>
            </b-row>
      </div>
        </b-container>
</div>
</template>

<script>

export default{
  name: 'BasicInfo',
  data () {
    return {
      title: '',
      place: '',
      people: '',
      period: '',
      memo: ''
    }
  },
  methods: {
    onClickInfo: function () {
      console.log(this.title)
      console.log(this.place)
      console.log(this.people)
      console.log(this.period)
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

.body{
  background-color: rgba(135, 135, 135, 0.909);
  border-radius: 20px;
  padding: 30px;
  margin: 30px;
  font-size: 30px;
  font-family: yg-jalnan;
}

.BasicInfo{
  padding: 0px 100px 100px 100px;
}

.text {
  padding-bottom: 10px;
  padding-top: 20px;
}

#buttons {
  text-align: right;
  padding: 15px;
}

#cancle, #next {
  margin-top: 20px;
  font-size: 40px;
}

#Page_name {
  font-family: yg-jalnan;
  margin: 10px;
  padding-left: 30px;
  font-size: 50px;
}

</style>
