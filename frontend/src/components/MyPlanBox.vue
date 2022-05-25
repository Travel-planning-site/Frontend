<template>
  <div class="MyPlanBox">
    <b-card style="width: 400px; height: 100%" align="center" border-variant="dark">
      <b-card-img src="https://picsum.photos/125/125/?image=58" style="width: 300px; height: 200px"></b-card-img>
      <b-list-group class="listgroup" flush>
        <b-list-group-item>
          <h4>Title</h4>
          <div id="title">여행 제목</div>
        </b-list-group-item>
        <b-list-group-item>
          <h4>Date</h4>
          <div id="date">여행 날짜</div>
        </b-list-group-item>
        <b-list-group-item>
          <h4>Who</h4>
          <div id="who">여행 동반자</div>
        </b-list-group-item>
      </b-list-group>
      <b-row cols="2">
          <b-col>
            <b-button block>편집</b-button>
          </b-col>
          <b-col>
            <b-button block>삭제</b-button>
          </b-col>
        </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'MyPlanBox',
  data () {
    return {
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
