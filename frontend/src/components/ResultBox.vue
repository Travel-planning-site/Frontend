<template>
    <div class="result_box">
        <!-- <b-card
          :img-src="place_img" img-top
          id="card_box"
        > -->
        <b-card-body class="card_box_body">
          {{place_name}}
          <b-card-title class="card_box_body" style="margin-top: -10px; font-weight: bold">{{place_name}}</b-card-title>
          <b-card-sub-title class="card_box_body" style="font-weight: lighter;">{{place_addr}}</b-card-sub-title>
          <b-button block class="card_box_body" @click="SeletedonClick" style="padding: -5px;">담기</b-button>
        </b-card-body>
        <!-- </b-card> -->
    </div>
</template>

<script>
export default {
  name: 'ResultBox',
  props: {
    ResultList_result: {
      type: Object
    }
  },
  data () {
    return {
      searchList: this.ResultList_result,
      place_name: this.ResultList_result.place_name,
      place_addr: this.ResultList_result.road_address_name
    }
  },
  watch: {
    ResultList_result () {
      this.place_name = this.ResultList_result.place_name
      this.place_addr = this.ResultList_result.road_address_name
    }
  },
  methods: {
    SeletedonClick () {
      this.$emit('SelectFromResult_box', this.ResultList_result)
    }
  }
}
</script>

<style scoped>
.result_box {
  border-radius: 5px;
  display: flex;
}
.card_box_body {
  white-space: nowrap;
  font-size: 0.9vw;
  margin: 0;
  padding: 5px;
}
#thumnail_img {
  max-height: 150px;
}
</style>
