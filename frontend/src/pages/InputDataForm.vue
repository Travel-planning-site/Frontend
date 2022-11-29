<template>
    <div class="body">
        <b-container class="container">
            <b-row>
                <b-col class="left">
                    <b-row id="sidebar">
                        <b-col cols="12" md="auto"><b-button v-b-toggle.sidebar-1 id="sideOpenBtn"><b-icon font-scale="2" icon="arrow-right-square"></b-icon></b-button>
                            <b-sidebar :visible="true" id="sidebar-1" width="25%" title="저장된 장소들" title-color="primary" shadow>
                                <div class="sidebarbox">
                                    <sidebar-box class="sidebarbox" v-for="(saved, index) in savedListProps" :key="index" :savedProps="saved" :index="index" style="text-align: center;" @startingonClicked="startingonClicked"
                                    @destinationClicked="destinationClicked"></sidebar-box>
                                </div>
                            </b-sidebar>
                        </b-col>
                        <b-col></b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row style="margin-bottom: 40px;">
                                <b-col style="text-align: center;"><img :src="startPlaceImg" id="startImg" art="https://picsum.photos/125/125/?image=58"></b-col>
                                <b-col style="text-align: center;"><img :src="arrivalPlaceImg" id="arriveImg" art="https://picsum.photos/125/125/?image=58"></b-col>
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
                                <b-col>이동수단</b-col>
                                <b-col>소요시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col>
                                    <b-form-select @change="changeOption()"
                                    :options="[ '도보', '자동차', '대중교통']"
                                    v-model="transportation"
                                ></b-form-select>
                                </b-col>
                                <b-col><b-form-input :id="totalTime"  placeholder="총 소요시간" v-model="totalTime"></b-form-input></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row class="title">
                                <b-col>출발시간</b-col>
                                <b-col>도착시간</b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input id="startTime" :type="'time'"></b-form-input></b-col>
                                <!-- bootstrap vue -->
                                <b-col><b-form-input id="arriveTime" :type="'time'"></b-form-input></b-col>
                            </b-row>
                            <b-row class="title">
                                <b-col>비용</b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="margin">
                                <b-col><b-form-input id = "costTitle" placeholder="항목" list="my-list-id"></b-form-input>
                                    <datalist id="my-list-id">
                                    <option v-for= "size in sizes" :key="size.id">{{ size }}</option>
                                    </datalist></b-col>
                                <b-col><b-form-input style = "width: 355px;" :id="content"  placeholder="가격" v-model="cost"></b-form-input></b-col>
                                <b-col><b-button @click="addBtnOnClick()">+</b-button></b-col>
                            </b-row>
                            <b-row class="margin" v-for= "costObject in costArray" :key="costObject.id">
                                <b-col>
                                    <div>{{costObject.costTitle}}</div></b-col>
                                <b-col><div>{{costObject.cost}}</div></b-col>
                                <b-col><b-button @click="removeBtnOnClick($event, costObject.costTitle, costObject.cost)">-</b-button></b-col>
                                </b-row>
                            <b-row>
                                <b-col></b-col>
                                <b-col><div>총 비용: {{totalCost}}</div></b-col></b-row>
                            <b-row class="title" style="margin-top: 20px;">
                                <b-col>메모</b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-textarea  class="mt-2" id="memo"  v-model="memo" placeholder="주의사항이나 메모할 내용을 입력해주세요." ></b-form-textarea>
                                </b-col>
                            </b-row>
                            <b-row class="button">
                                <b-col>
                                  <b-button id="button" @click="inputOnClick">입력완료</b-button>
                                  <b-button id="button" @click="savePlans">저장하기</b-button>
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
import ResultBox from './ResultBox.vue'
export default{
  emits: ['msg'],
  components: { ResultBox },
  name: 'InputData',
  props: {
    savedListProps: Array,
    idxProp: Number,
    durationProps: String,
    userId: Number
  },
  data () {
    return {
      startPlace: '',
      arrivalPlace: '',
      start_time: '',
      arrive_time: '',
      cost: 0,
      transportation: '',
      content: '',
      totalTime: '',
      memo: '',
      startPlaceImg: '',
      arrivalPlaceImg: '',
      sizes: ['렌트카', '택시', '버스비', '입장료'],
      costObject: {
        costTitle: '',
        cost: ''
      },
      costArray: [],
      totalCost: 0,
      startingObject: '',
      destinationObject: '',
      plans: [],
      plan: {
        startPlaceImg: '',
        arrivalPlaceImg: '',
        startPlace: '',
        arrivalPlace: '',
        costArray: '',
        totalCost: Number,
        startTime: '',
        arriveTime: '',
        transportation: '',
        totalTime: '',
        memo: ''
      },
      positions: [],
      img: 'https://picsum.photos/125/125/?image=58'
    }
  },
  methods: {
    changeOption: function () {
    },
    sidebar: function () {
      alert('sidebar')
    },
    getImage: function (placeName, placeImg, i) {
      axios.get(
        LOCAL_URL + '/api/searchImg?query=' + placeName, {
        }).then((res) => {
        placeImg.setAttribute('src', res.data)
        if (i === 1) this.startPlaceImg = res.data
        else this.arrivalPlaceImg = res.data
      }).catch(() => {
        console.log('이미지 가져오기 실패')
      })
    },
    addBtnOnClick: function () {
      if (this.cost !== '') {
        let costObject = {costTitle: document.getElementById('costTitle').value, cost: this.cost}
        console.log(costObject)
        this.costArray.push(costObject)
        console.log(this.costArray)
        this.totalCost += Number(this.cost)
        document.getElementById('costTitle').value = ''
        this.cost = ''
      }
    },
    removeBtnOnClick: function (event, costTitle, cost) {
      console.log(event.path[2])
      //   event.path[3].removeChild(event.path[2])
      this.costArray = this.costArray.filter((item) => item.costTitle !== costTitle)
      console.log(this.costArray)
      this.totalCost -= cost
      console.log(document.getElementsByClassName('left'))
    },
    startingonClicked (index) {
      this.destinationObject = ''
      this.resetDestnation()
      this.startingObject = this.savedListProps[index]
      this.getImage(this.startingObject.placeName, document.querySelector('#startImg'), 1)
      this.startPlace = this.startingObject.placeName
    },
    destinationClicked (index) {
      if (this.startingObject === '') {
        alert('출발지를 먼저 선택해주세요.')
      } else {
        if (this.startingObject !== this.savedListProps[index]) {
          document.getElementsByClassName('close text-dark')[0].click()
          this.destinationObject = this.savedListProps[index]
          this.arrivalPlace = this.destinationObject.placeName
          this.getImage(this.destinationObject.placeName, document.querySelector('#arriveImg'), 2)
          this.arrivalPlace = this.destinationObject.placeName
          this.$emit('coordinate', this.startingObject, this.destinationObject)
        } else if (this.startingObject === this.savedListProps[index]) {
          alert('출발지와 다른 도착지를 선택해주세요.')
        }
      }
    },
    resetDestnation: function () {
      this.arrivalPlaceImg = ''
      this.arrivalPlace = ''
    },
    inputOnClick: function () {
      this.plan = {
        startPlaceImg: this.startPlaceImg,
        arrivalPlaceImg: this.arrivalPlaceImg,
        startPlace: this.startPlace,
        arrivalPlace: this.arrivalPlace,
        // costArray: this.costArray,
        totalCost: this.totalCost,
        startTime: document.getElementById('startTime').value,
        arriveTime: document.getElementById('arriveTime').value,
        transportation: this.transportation,
        totalTime: this.totalTime,
        memo: this.memo
      }
      console.log('idx: ', this.idxProp)
      axios.post(
        LOCAL_URL + '/save/travel',
        {
          infoIdx: this.idxProp,
          startPlaceImg: this.startPlaceImg,
          arrivalPlaceImg: this.arrivalPlaceImg,
          startPlace: this.startPlace,
          arrivalPlace: this.arrivalPlace,
          cost: this.totalCost,
          startTime: document.getElementById('startTime').value,
          arriveTime: document.getElementById('arriveTime').value,
          transportation: this.transportation,
          totalTime: this.totalTime,
          memo: this.memo,
          userId: this.userId
        }
      ).then((res) => console.log(res))
        .catch((caches) => console.log(caches))

      this.plans.push(this.plan)
      console.log(this.plan)
      console.log(this.plans)
      this.inputDataReset() // 입력 값 초기화
      const position = Array.from(Array(2), () => new Array(2))
      position[0][0] = this.startingObject.placeY
      position[0][1] = this.startingObject.placeX
      position[1][0] = this.destinationObject.placeY
      position[1][1] = this.destinationObject.placeX

      console.log(position)
      this.positions.push(position) // 좌표값들
      this.startingObject = this.destinationObject
      this.destinationObject = ''
      document.getElementById('sideOpenBtn').click()
    },
    inputDataReset: function () {
      this.startPlaceImg = this.arrivalPlaceImg
      this.arrivalPlaceImg = ''
      this.startPlace = this.arrivalPlace
      this.arrivalPlace = ''
      document.getElementById('costTitle').value = ''
      this.cost = ''
      this.totalCost = 0
      this.costArray = []
      document.getElementById('startTime').value = ''
      document.getElementById('arriveTime').value = ''
      this.transportation = ''
      this.totalTime = ''
      this.memo = ''
    },
    savePlans () { // 저장
      console.log(this.positions)
      this.$router.push({name: 'ResultOfPlan', params: { positions: this.positions, plans: this.plans }})
      // this.$router.push({name: 'PlanData', query: { data: this.plans }})
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    transportation () {
      this.$emit('msg', this.transportation)
    },
    durationProps () {
      this.totalTime = this.durationProps
    },
    costArray () {
      this.$emit('height', document.getElementsByClassName('left')[0].offsetHeight)
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
    margin-bottom: 30px;
}

.left {
    padding: 0 30px 30px 30px;
    height: auto;
    margin-top: 20px;
    padding-bottom: 30px;
}
.button{
    text-align: right;
}
.sidebarbox{
  margin: 5px;
  padding: 2px;
  display: block;
  flex-wrap: wrap;
}

.body {
  height: auto;

}

#button {
    margin-top: 20px;
    bottom : 130px;
    width : 90px;
    right : 30px;
    border: 5px;
}
#sidebar-1 {
  position: fixed;
  overflow: auto;
  margin: 0;
  padding: 0;
}
#sidebar {
    margin-bottom: 40px;
    background-color: rgba(255, 255, 255, 0.943);
}
#startImg, #arriveImg {
    width: 400px;
    height: 300px;
    border-radius: 10px;
}
#costTitle {
  width: 420px;
}

</style>
