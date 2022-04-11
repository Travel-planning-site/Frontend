<template>
    <div class="result_box">
        <b-card
          v-bind:img-src="background_img" img-top
          id="card_box"
        >
        <b-card-body class="card_box_body">
          <b-card-title class="card_box_body" style="margin-top: -10px; font-weight: bold">{{place_name}}</b-card-title>
          <b-card-sub-title class="card_box_body" style="font-weight: lighter;">{{place_addr}}</b-card-sub-title>
          <b-button block class="card_box_body" style="padding: -5px;">담기</b-button>
        </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'ResultBox',
  data () {
    return {
      background_img: 'https://cdn.smartlifetv.co.kr/news/photo/202107/12282_15191_4027.jpg',
      place_name: '장소이름',
      place_addr: '장소주소'
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
