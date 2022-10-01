<template>
<div>
    <div id="map"></div>
    <b-button id="distanceBtn" @click = "showDistance">총 거리는?</b-button>
    <b-button id="resultBtn" @click = "resultBtnOnClick">결과보기</b-button>
</div>
</template>

<script>
export default {
  data () {
    return {
      positions: [],
      distance: ''
    }
  },
  created () {
    this.positions = this.$route.params.positions
    console.log(this.positions)
    console.log(this.$route.params.plans)
  },
  mounted () {
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9a4aa318d5005cc9a0d8a948398a30bc'
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap () {
      let centerPosition = this.positions[0]
      console.log(centerPosition)
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(centerPosition[0][0], centerPosition[0][1]),
        level: 9
      }
      this.map = new kakao.maps.Map(container, options)

      this.positions.map((number, i, position) => {
        let array = number[0]
        let marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(array[0], array[1])
        })
        marker.setMap(this.map)
      })
      const linePath = this.getLinePath()

      let polyline = new kakao.maps.Polyline({
        map: this.map,
        path: linePath,
        strokeWeight: 8,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8
      })
      polyline.setMap(this.map)
      if (Math.floor(parseInt(polyline.getLength())) >= 1000) {
        this.distance = '총 거리: ' + parseInt(Math.floor(polyline.getLength()) / 1000) + 'Km'
      } else this.distance = '총 거리: ' + Math.floor(polyline.getLength()) + 'm'
    },
    getLinePath () {
      const latlngArray = new Array(this.positions.length)
      for (let i = 0; i < this.positions.length; i++) {
        latlngArray[i] = new kakao.maps.LatLng(this.positions[i][0][0], this.positions[i][0][1])
      }
      return latlngArray
    },
    showDistance () {
      alert(this.distance)
    },
    resultBtnOnClick () {
      this.$router.push({name: 'PlanData', params: { plans: this.$route.params.plans }})
    }
  }
}
</script>

<style scoped>
#map {
  width : 100%;
  height: 1500px;
}

#distanceBtn {
  z-index: 1;
  position:fixed;
  right:100px;
  bottom:270px;
  font-size: 2em;
}

#resultBtn {
  z-index: 1;
  position:fixed;
  right:100px;
  bottom:200px;
  font-size: 2em;
}
</style>
