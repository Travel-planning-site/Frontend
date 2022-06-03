<template>
    <div class="body">
        <b-container class="container">
            <b-row>
                <b-col class="left">
                    <b-row id="sidebar">
                        <b-col cols="12" md="auto"><b-button v-b-toggle.sidebar-1 id="sideOpenBtn"><b-icon font-scale="2" icon="arrow-right-square"></b-icon></b-button>
                            <b-sidebar :visible="true" id="sidebar-1" width="25%" title="저장된 장소들" title-color="primary" shadow>
                                <div class="sidebarbox">
                                    <sidebar-box class="sidebarbox" v-for="(saved, index) in savedListProps" :key="index" :savedProps="saved" :index="index" style="text-align: center;" @startingonClicked="startingonClicked" @destinationClicked="destinationClicked"></sidebar-box>
                                </div>
                            </b-sidebar>
                        </b-col>
                        <b-col>Where - date</b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row style="margin-bottom: 40px;">
                                <b-col style="text-align: center;"><img :src="startPlaceImg" id="img" art="https://picsum.photos/125/125/?image=58"></b-col>
                                <b-col style="text-align: center;"><img :src="arrivalPlaceImg" id="img" art="https://picsum.photos/125/125/?image=58"></b-col>
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
                                <b-col><b-form-input :id="content"  placeholder="가격" v-model="cost"></b-form-input></b-col>
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

import axios from 'axios'
import ResultBox from './ResultBox.vue'
// import {EventBus} from '../main'
export default{
  emits: ['msg'],
  components: { ResultBox },
  name: 'InputData',
  props: {
    savedListProps: Array,
    durationProps: String
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
      placeImg: '',
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
    //   EventBus.$emit('message', 'hello world')
    },
    sidebar: function () {
      alert('sidebar')
    },
    // setTitle: function (savedList) {
    //   this.startPlace = savedList[0].place_name
    //   this.arrivalPlace = savedList[1].place_name
    // },
    getImage: function (placeName, num) {
      axios.get(
        'https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/image?query=' + placeName, {
          headers: {
            'X-Naver-Client-Id': 'o9H6ct1KNCA_QMfWXbtT',
            'X-Naver-Client-Secret': 'kRkOfXCxP2'
          }
        }).then((res) => {
        if (res.status === 200) {
          this.placeImg = res.data.items[1].thumbnail
          if (num === 1) this.startPlaceImg = this.placeImg
          if (num === 2) this.arrivalPlaceImg = this.placeImg
        }
        console.log(res)
      }).catch(() => {
        if (num === 1) this.startPlaceImg = this.img
        if (num === 2) this.arrivalPlaceImg = this.img
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
      this.getImage(this.startingObject.place_name, 1)
      this.startPlace = this.startingObject.place_name
    },
    destinationClicked (index) {
      if (this.startingObject === '') {
        alert('출발지를 먼저 선택해주세요.')
      } else {
        if (this.startingObject !== this.savedListProps[index]) {
          document.getElementsByClassName('close text-dark')[0].click()
          this.destinationObject = this.savedListProps[index]
          this.getImage(this.destinationObject.place_name, 2)
          this.arrivalPlace = this.destinationObject.place_name
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
        costArray: this.costArray,
        totalCost: this.totalCost,
        startTime: document.getElementById('startTime').value,
        arriveTime: document.getElementById('arriveTime').value,
        transportation: this.transportation,
        totalTime: this.totalTime,
        memo: this.memo
      }
      this.plans.push(this.plan)
      console.log(this.plan)
      console.log(this.plans)
      this.inputDataReset()
      const position = Array.from(Array(2), () => new Array(2))
      position[0][0] = this.startingObject.y
      position[0][1] = this.startingObject.x
      position[1][0] = this.destinationObject.y
      position[1][1] = this.destinationObject.x
      console.log(position)
      this.positions.push(position)
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
    savePlans () {
      console.log(this.positions)
      this.$router.push({name: 'ResultOfPlan', params: { positions: this.positions, plans: this.plans }})
      // this.$router.push({name: 'PlanData', query: { data: this.plans }})
    }
  },
  created () {
    // this.setTitle(this.savedListProps)
    // this.getImage(this.startPlace, 1)
    // this.getImage(this.arrivalPlace, 2)
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
    background-color: rgb(240, 228, 255);
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
    background-color: rgba(226, 213, 247, 0.943);
}
#img {
    width: 400px;
    height: 300px;
}

</style>
