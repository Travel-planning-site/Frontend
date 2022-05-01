<template>
    <div id="map" style="width:100%; height:966px;"></div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
import axios from 'axios'
// import {EventBus} from '../main'
export default {
  components: { InputDataForm },
  name: 'KakaoMap',
  props: {
    savedListProps: Array,
    routesProps: Array
  },
  data () {
    return {
      markerPositions1: [
        [0, 0],
        [0, 0]
        // [33.4524745, 126.5712975]
      ],
      markerPositions2: [
      ],
      markers: [],
      infowindow: null,
      savedList: [],
      midPoint: [],
      guides: {},
      linePath: ''
    }
  },
  created () {
    this.markerPositions1 = this.getAddress(this.savedListProps)
    console.log(this.routesProps)
    this.getKakaoNavi(this.markerPositions1)
    // console.log(this.getKakaoNavi(this.markerPositions1)) // 결과값이 제대로 나오지 않음, 비동기 통신 관련 문제
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
    getAddress (savedList) { // 좌표 구하기
      for (var i = 0; i < savedList.length; i++) {
        this.markerPositions1[i][0] = savedList[i].y
        this.markerPositions1[i][1] = savedList[i].x
      }
      return this.markerPositions1
    },
    getMidPoint (markerPoint) { // overlay를 나타내기 위한 중간좌표 값 구하기
      this.midPoint[0] = (parseFloat(markerPoint[0][0]) + parseFloat(markerPoint[1][0])) / 2
      this.midPoint[1] = (parseFloat(markerPoint[0][1]) + parseFloat(markerPoint[1][1])) / 2
      return this.midPoint
    },
    getLinePath (address) {
      if (address.length === 2) {
        const latlngArray = new Array(2)
        console.log(latlngArray)
        for (var i = 0; i < 2; i++) {
          latlngArray[i] = new kakao.maps.LatLng(address[i][0], address[i][1])
        }
        return latlngArray
      } else {
        const latlngArray = new Array(address.length)
        for (var j = 0; j < address.length; j++) {
          latlngArray[j] = new kakao.maps.LatLng(address[j][0], address[j][1])
        }
        console.log(latlngArray)
        return latlngArray
      }
    },
    initMap () {
      const container = document.getElementById('map') // 지도를 표시할 div
      console.log(container)
      const options = {
        center: new kakao.maps.LatLng(this.markerPositions1[0][0], this.markerPositions1[0][1]), // 지도의 중심좌표
        level: 2 // 지도를 확대할 div
      }
      // 지도 객체를 등록합니다.
      // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options) // 지도 생성
      this.displayMarker(this.markerPositions1) // 마커 생성
      // console.log(this.getKakaoNavi(this.markerPositions1))
      // this.setLine()
    },
    setLine (address) {
      this.linePath = this.getLinePath(address)
      // console.log(linePath)

      // const linePath = [
      //   new kakao.maps.LatLng(35.157561850795894, 129.1726255253951),
      //   new kakao.maps.LatLng(35.15920809173113, 129.170168603706),
      //   new kakao.maps.LatLng(35.17216470466875, 129.1818477816053),
      //   new kakao.maps.LatLng(35.175773796521696, 129.18332716704396),
      //   new kakao.maps.LatLng(35.1833187391316, 129.20068467557806),
      //   new kakao.maps.LatLng(35.18137432737682, 129.2058710134972),
      //   new kakao.maps.LatLng(35.191346562036266, 129.21548323338433),
      //   new kakao.maps.LatLng(35.19398128687029, 129.213414223396)
      // ]
      console.log(this.linePath)

      if (this.length !== '') {
        var polyline = new kakao.maps.Polyline({
          path: this.linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: '#FFAE00', // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
        })

        polyline.setMap(this.map)
      }

      var distance = polyline.getLength().toFixed(0)
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = distance / 67 | 0
      var walkHour = ''
      var walkMin = ''

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
      }
      walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

      var content = '<ul class="dotOverlay">'
      content += '    <li>'
      content += '        <span class="label">총거리 </span><span class="number">' + distance + '</span>m'
      content += '    </li>'
      content += '    <li>'
      content += '        <span class="label">도보 </span>' + walkHour + walkMin
      content += '    </li>'
      content += '</ul>'

      const distanceOverlay = new kakao.maps.CustomOverlay({
        map: this.map,
        content: content,
        position: new kakao.maps.LatLng(this.midPoint[0], this.midPoint[1]),
        yAnchor: 0.5,
        zIndex: 0
      })
      distanceOverlay.setMap(this.map)
    },
    changeSize (size) {
      const container = document.getElementById('map')
      container.style.width = `${size}px`
      container.style.height = `${size}px`
      this.map.relayout()
    },
    displayMarker (markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null))
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      )

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position
            })
        )

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        )

        this.map.setBounds(bounds)
      }
    },
    async getKakaoNavi (address) {
      // console.log(routes)
      console.log(address)
      // https://cors-anywhere.herokuapp.com 접속 후 request
      // CORS 문제로 다른 사람이 만든 프록시 서버 이용, 추후 헤로쿠 사용하여 해결
      await axios.get(
        'https://cors-anywhere.herokuapp.com/https://apis-navi.kakaomobility.com/v1/directions', {
          headers: { 'Authorization': 'KakaoAK c01ebcf3f04756103db0826a158a5c21'
          },
          params: {
            origin: address[0][1] + ',' + address[0][0],
            destination: address[1][1] + ',' + address[1][0]
          }
        }).then((res) => {
        console.log(res)
        const resultCode = res.data.routes[0].result_code
        if (resultCode === 105) { // 교통 장애가 있다면
          alert(res.data.routes[0].result_msg)
          this.setLine(address)
          // return address
        } else if (resultCode === 0) { // 길찾기 성공
          this.guides = res.data.routes[0].sections[0].guides
          this.markerPositions2 = this.getAddressList(this.guides)
          console.log(this.markerPositions2) // 카카오네비 결과값 x,y
          this.setLine(this.markerPositions2)

        // return this.markerPositions2
        }
      })
    },
    getAddressList (guides) {
      // const arr = new Array(guides.length)
      // for (var i = 0; i < guides.length; i++) {
      //   arr[i] = new Array(2)
      // }
      const arr = new Array(guides.length).fill(0).map(() => new Array(2))
      for (var j = 0; j < guides.length; j++) {
        arr[j][0] = guides[j].x
        arr[j][1] = guides[j].y
      }
      return arr
    }
  },
  watch: {
    markerPositions2: function () {
      this.setLine(this.markerPositions2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    margin-left: -20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

</style>
