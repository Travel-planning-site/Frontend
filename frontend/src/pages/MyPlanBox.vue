<template>
  <div class="MyPlanBox">
    <b-card
      style="width: 400px;
      height: 100%"
      align="center"
      border-variant="dark">
      <img :src = "imgUrl" style="width: 300px; height: 200px" />
      <b-list-group class="listgroup" flush>
        <b-list-group-item>
          <h4>Title</h4>
          <div id="title">{{plan.title}}</div>
        </b-list-group-item>
        <b-list-group-item>
          <h4>Date</h4>
          <div id="date">{{plan.period}}</div>
        </b-list-group-item>
        <b-list-group-item>
          <h4>Who</h4>
          <div id="who">{{plan.people}}</div>
        </b-list-group-item>
      </b-list-group>
      <b-row cols="2">
          <b-col>
            <b-button @click="onClickDetail()" block>상세보기</b-button>
          </b-col>
          <b-col>
            <b-button @click="onClickDelete($event)" block>삭제</b-button>
          </b-col>
        </b-row>
    </b-card>
  </div>
</template>

<script>
import { LOCAL_URL } from '../url/BackendUrl'
import axios from 'axios'

export default {
  name: 'MyPlanBox',
  props: {
    planData: {
      type: Object
    }
  },
  data () {
    return {
      plan: {},
      travles: [],
      imgUrl: 'https://picsum.photos/125/125/?image=58'
    }
  },
  created () {
    this.plan = this.planData.info
    this.travles = this.planData.travles
    this.imgUrl = this.planData.travles[0].startPlaceImg
  },
  methods: {
    onClickDetail () {
      this.$router.push({name: 'MyPlanDetails', params: { travles: this.travles }})
    },
    onClickDelete () {
      console.log(this.plan.idx)
      axios.delete(LOCAL_URL + '/myPage/plan/' + this.plan.idx)
        .then(res => {
          console.log(res)
          window.location.reload(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .listgroup {
    text-align: left;
  }
  #title, #date, #who {
    color: #605E61;
    font-size: 1.1em;
  }
</style>
