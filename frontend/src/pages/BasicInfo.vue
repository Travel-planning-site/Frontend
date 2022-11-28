<template>
    <div>
        <b-container class="BasicInfo" >
            <b-row>
                <b-col md="6" offset-md="2" >
                    <b-row id="Page_name">여행정보 입력</b-row>
            <b-row style="width:700px;">
                <b-col class="body">
                <b-row>
                    <b-col class="text">Title</b-col>
                </b-row>
                <b-row>
                    <b-col id="title">
                        <b-form-input
                            :id="title"
                            placeholder="여행 제목"
                            v-model="title">
                        </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text">Where</b-col>
                </b-row>
                <b-row>
                    <b-col id="place">
                        <b-form-input
                            :id="place"
                            placeholder="여행 장소"
                            v-model="place">
                        </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text">Who</b-col>
                </b-row>
                <b-row >
                    <b-col id="people">
                        <b-form-input
                            :id="people"
                            placeholder="여행 동반자"
                            v-model="people">
                    </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text">How long</b-col>
                </b-row>
                <b-row>
                    <b-col id="period">
                        <b-form-input
                            :id="period"
                            placeholder="여행 기간"
                            v-model="period">
                        </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text">메모</b-col>
                </b-row>
                <b-row>
                    <b-col id="memo">
                        <b-form-textarea
                            label="label"
                            class="p-2 bg-light border"
                            id="memo"
                            v-model="memo"
                            placeholder="주의사항"
                            no-resize="no-resize">
                        </b-form-textarea>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col id="buttons">
                        <b-button id="cancle"
                            @click="$router.push('/')">
                            Cancle
                        </b-button>
                        <b-button id="next"
                            @click="onClickInfo()">
                            Next
                        </b-button>
                    </b-col>
                </b-row>
                </b-col>
            </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { LOCAL_URL } from '../url/BackendUrl'
import axios from 'axios'
export default {
  name: 'BasicInfo',
  data () {
    return {title: '', place: '', people: '', period: '', memo: '', idx: 0, userId: ''}
  },
  created () {
    this.userId = this.$route.params.userInfo.id
  },
  methods: {
    onClickInfo: function () {
      axios.post(
        LOCAL_URL + '/save/basic',
        {
          title: this.title,
          place: this.place,
          people: this.people,
          period: this.period,
          memo: this.memo,
          userId: this.userId
        }
      ).then((res) => {
        this.idx = res.data
        console.log(this.idx)
        this.$router.push({name: 'ResearchPlace', params: { idx: this.idx, userId: this.userId }})
      })
        .catch((caches) => console.log(caches))
    }
  }
}
</script>

<style scoped="scoped">
    @font-face {
        font-family: 'yg-jalnan';
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff") format('woff');
        font-weight: normal;
        font-style: normal;
    }

    .body {
        background-color: rgba(135, 135, 135, 0.909);
        border-radius: 20px;
        padding: 20px;
        margin: 0 30px 0 30px;
        font-size: 20px;
        font-family: yg-jalnan;
        height: 570px;
    }

    .BasicInfo {
        padding: 0 100px 100px;
    }

    .text {
        padding-bottom: 10px;
        padding-top: 5px;
    }

    #buttons {
        text-align: right;
        padding-top: 15px;
    }

    #cancle,
    #next {
        margin-top: 5px;
        font-size: 20px;
    }

    #Page_name {
        font-family: yg-jalnan;
        margin: 10px;
        padding-top: 80px;
        font-size: 35px;
    }

</style>
