<template>
  <div class="DaumSearch">
  </div>
</template>

<script>
// import axios from 'axios'
// import { LOCAL_URL } from '../url/BackendUrl'
export default {
  name: 'DaumSearch',
  props: {
    listData: {
      type: Array
    }
  },
  data () {
    return {
      ImageList: [],
      listLength: 0
    }
  },
  watch: {
    listData: function () {
      this.Totalsearch()
    }
  },
  methods: {
    Totalsearch () {
      console.log('사진 가져오기 동작')
      if (this.listData.length > 0) {
        for (var i = 0; i < this.listData.length; i++) {
          this.Imagesearch(this.listData[i].place_name)
        }
        this.$emit('getImageList', this.ImageList)
      }
    }
    // Imagesearch (keyword) {
    //   axios.get(
    //     'https://dapi.kakao.com/v2/search/image?sort=accuracy&page=1&size=1&query=' + keyword, {
    //       headers: { Authorization: 'KakaoAK c01ebcf3f04756103db0826a158a5c21' }
    //     }).then((res) => {
    //     if (typeof res.data.documents[0] === 'undefined') {
    //       this.ImageList.push('https://cdn.smartlifetv.co.kr/news/photo/202107/12282_15191_4027.jpg')
    //     } else {
    //       this.ImageList.push(res.data.documents[0].image_url)
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // }
    // ImageSearch (keyword) {
    //   axios.get(LOCAL_URL + '/ResearchPlace/searchphoto' + '?input=' + keyword)
    //     .then(res => {
    //     })
    // }
  }
}
</script>
