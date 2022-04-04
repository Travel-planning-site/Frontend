<template>
<div>
    <b-container class="BasicInfo">
      <div class="body">
        <b-row><b-col>Title</b-col></b-row>
            <b-row>
              <b-col id="title_area"><b-form-input :id="title" size="lg" placeholder="여행 제목" v-model="title"></b-form-input></b-col>
            </b-row>
            <b-row>
              <b-col class="text">Where</b-col>
            </b-row>
            <b-row>
                <b-col id="place_area">
                    <b-form-input :id="place" size="lg" placeholder="여행 장소" v-model="place"></b-form-input>
                </b-col>
            </b-row>
            <b-row><b-col class="text">Who</b-col></b-row>
            <b-row >
                <b-col id="people_area"><b-form-input :id="people" size="lg" placeholder="여행 동반자" v-model="people"></b-form-input></b-col>
            </b-row>
            <b-row><b-col class="text">How Long</b-col></b-row>
            <b-row>
                <b-col id="period_area"><b-form-input :id="period" size="lg" placeholder="여행 기간" v-model="period"></b-form-input></b-col>
            </b-row>
            <b-row><b-col class="text">메모</b-col></b-row>
            <b-row>
                <b-col id="memo_area">
                    <b-form-textarea label class="p-2 bg-light border" id="memo" size="lg" v-model="memo" placeholder="주의사항" rows="3" max-rows="6" no-resize></b-form-textarea>
                </b-col>
            </b-row>
            <b-row>
              <b-col id="buttons">
                <b-button id="cancle" @click="$router.push('/')">Cancle</b-button>
                <b-button id="next">Next</b-button>
              </b-col>
            </b-row>
      </div>
        </b-container>
</div>
</template>

<script>

export default{
  name: 'BasicInfo'

}
</script>

<style scoped>
.body{
  background-color: rgba(135, 135, 135, 0.909);
  border-radius: 20px;
  padding: 30px;
  height: auto;
  font-size: 40px;
}

.BasicInfo{
  padding-top: 100px;
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

</style>
