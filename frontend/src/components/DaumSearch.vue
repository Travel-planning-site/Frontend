<template>
  <div class="DaumSearch">
  </div>
</template>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
import axios from 'axios'
export default {
  name: 'DaumSearch',
  props: {
    listData: {
      type: Array,
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      ImageList: [],
      listLength: 0
    }
  },
  watch: {
    listData: {
      handler(newData) {
        this.ImageList.splice(0)
        this.Totalsearch()
        console.log('동작')
      }
    }
  },
  methods: {
    Totalsearch () {
      if (this.listData.length > 0) {
        for (var i = 0; i < this.listData.length; i++) {
          this.Imagesearch(this.listData[i].address_name)
        }
        this.$emit('getImageList', this.ImageList)
      }
    },
    Imagesearch (keyword) {
      axios.get(
        'https://dapi.kakao.com/v2/search/image?sort=accuracy&page=1&size=1&query=' + keyword, {
          headers: { 'Authorization': 'KakaoAK c01ebcf3f04756103db0826a158a5c21' }
      }).then((res) => {
        this.ImageList.push(res.data.documents[0].image_url)
      }).catch((error) => {
        this.ImageList.push('https://cdn.smartlifetv.co.kr/news/photo/202107/12282_15191_4027.jpg')
      })
    }
  }
}
</script>
