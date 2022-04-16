<template>
    <div class="result_box">
        <b-card
          :img-src="place_img" img-top
          id="card_box"
        >
        <b-card-body class="card_box_body">
          <b-card-title class="card_box_body" style="margin-top: -10px; font-weight: bold">{{place_name}}</b-card-title>
          <b-card-sub-title class="card_box_body" style="font-weight: lighter;">{{place_addr}}</b-card-sub-title>
          <b-button block class="card_box_body" @click="SeletedonClick" style="padding: -5px;">담기</b-button>
        </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'ResultBox',
  props: {
    ResultList_results: {
      type: Object,
      default: () => {
        return {
          place_img: '',
          place_name: '',
          place_addr: ''
        }
      }
    }
  },
  data () {
    return {
      selectedList: this.ResultList_results,
      place_name: this.ResultList_results.place_name,
      place_addr: this.ResultList_results.place_addr,
      place_img: this.ResultList_results.place_img
    }
  },
  methods: {
    SeletedonClick () {
      this.$emit('SelectFromResult_box', this.selectedList)
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
