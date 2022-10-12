<template>
    <div id="map" ref="kakaoMap"></div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
import axios from 'axios'
import {EventBus} from '../main'
export default {
  components: { InputDataForm },
  name: 'KakaoMap',
  props: {
    savedListProps: Array,
    transportation: String,
    heightProp: String
  },
  data () {
    return {
      markerPositions1: [
        [0, 0],
        [0, 0]
      ],
      markerPositions2: [
      ],
      markers: [],
      infowindow: null,
      savedList: [],
      midPoint: [],
      guides: {},
      linePath: '',
      time: '',
      duration: 0,
      positionArray: []
    }
  },
  created () {
    EventBus.$on('push-positions', (positions) => { // InputData에서 출발지, 도착지 좌표 전달받았을 경우
      this.markerPositions1 = positions
      // this.getMidPoint(this.markerPositions1)
      // this.getKakaoNavi(this.markerPositions1)
      // this.transit = this.getDuration(this.markerPositions1)
      // this.initMap()

      // this.positionArray.push(positions)
      // console.log(this.positionArray)
    })
  },
  mounted () {
    // https://codesandbox.io/s/nervous-keldysh-87yxg
    if (window.kakao && window.kakao.maps) {
      // this.initMap()
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
      for (let i = 0; i < 2; i++) {
        this.markerPositions1[i][0] = savedList[i].placeY
        this.markerPositions1[i][1] = savedList[i].placeX // 129
      }
      return this.markerPositions1
    },
    getMidPoint (markerPoint) { // overlay를 나타내기 위한 중간좌표 값 구하기
      this.midPoint[0] = (parseFloat(markerPoint[0][0]) + parseFloat(markerPoint[1][0])) / 2
      this.midPoint[1] = (parseFloat(markerPoint[0][1]) + parseFloat(markerPoint[1][1])) / 2
      return this.midPoint
    },
    getLinePath (address) {
      if (address.length === 2) { // 출발지, 도착지만 있을 경우
        const latlngArray = new Array(2)
        console.log(latlngArray)
        for (let i = 0; i < 2; i++) {
          latlngArray[i] = new kakao.maps.LatLng(address[i][0], address[i][1])
        }
        return latlngArray
      } else {
        const latlngArray = new Array(address.length)
        for (let j = 0; j < address.length; j++) {
          latlngArray[j] = new kakao.maps.LatLng(address[j][1], address[j][0])
        }
        return latlngArray
      }
    },
    initMap () {
      const container = document.getElementById('map') // 지도를 표시할 div
      console.log(container)
      const options = {
        center: new kakao.maps.LatLng(this.markerPositions1[0][0], this.markerPositions1[0][1]), // 지도의 중심좌표
        level: 5 // 지도를 확대할 div
      }

      this.map = new kakao.maps.Map(container, options) // 지도 생성
    },
    setLine (address) {
      let linePath = this.getLinePath(address)
      this.setLineAndOverLay(linePath)
    },
    setLineAndOverLay (linePath, duration) {
      this.displayMarker(this.markerPositions1) // 마커 생성

      let polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 10, // 선의 두께
        strokeColor: 'blue', // 선의 색깔
        strokeOpacity: 0.7, // 선의 불투명도, 1에서 0 사이의 값이며 0에 가까울수록 투명
        strokeStyle: 'solid' // 선의 스타일
      })

      console.log(polyline)
      polyline.setPath(linePath)
      polyline.setMap(null)
      polyline.setMap(this.map)
      let distance = polyline.getLength().toFixed(0)
      this.setOverLay(distance, duration)
    },
    async setOverLay (distance, duration) { // 커스텀오버레이
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min
      let walkkTime = distance / 67 | 0
      let walkHour = ''
      let walkMin = ''
      if (distance >= 1000) {
        var distanceCheck = true
        distance /= 1000
        distance = Math.floor(distance)
      }
      this.time = Math.floor(walkkTime / 60) + '시간 ' + walkkTime % 60 + '분' // 도보시간

      let hour = parseInt(duration / 3600)
      let min = parseInt((duration % 3600) / 60)

      if (hour < 1) { this.carTime = min + '분' } else { this.carTime = hour + '시간' + min + '분' } // 자동차 소요시간

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시
      if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
      }
      walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

      let content = '<ul class="dotOverlay">'
      content += '    <li>'
      if (distanceCheck) content += '        <span class="label">총거리 </span><span class="number">' + distance + '</span>Km'
      else content += '        <span class="label">총거리 </span><span class="number">' + distance + '</span>m'
      content += '    </li>'
      if (Math.floor(walkkTime / 60) < 1) {
        content += '    <li>'
        content += '        <span class="label">도보 </span>' + walkHour + walkMin
        content += '    </li>'
      } else {
        content += '    <li>'
        content += '        <span class="label">도보</span>' + '<span class="number"> 1</span>' + '시간이상'
        content += '    </li>'
      }
      content += '    <li>'
      content += '        <span class="label">자동차 </span>' + '<span style="color: blue; font-weight:bold;">'
      if (hour > 0) { content += hour + '시간' }
      content += min + '분' + '</span>'
      content += '    </li>'
      content += '    <li>'
      content += '        <span class="label">대중교통 </span>' + '<span style="color: blue; font-weight:bold;">' + this.transit + '</span>'
      content += '    </li>'
      content += '</ul>'

      const distanceOverlay = new kakao.maps.CustomOverlay({
        map: this.map,
        content: content,
        position: new kakao.maps.LatLng(this.midPoint[0], this.midPoint[1]),
        yAnchor: 0.5,
        zIndex: 0
      })
      // this.distanceOverlay.setMap(null)
      distanceOverlay.setMap(this.map)
    },
    displayMarker (markerPositions) { // 마커 생성
      console.log(markerPositions)
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => {
          marker.setMap(null)
        })
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      )

      if (positions.length > 0) {
        for (let i = 0; i < positions.length; i++) {
          const content = this.savedListProps[i].placeName
          let iwContent = '<div style="padding:5px; font-size:18px;">' + content + '</div>'
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: positions[i]
          })
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent
          })
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            let map = marker.getMap()
            infowindow.open(map, marker)
          })

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close()
          })
        }

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        )

        this.map.setBounds(bounds) // 지도의 중심 좌표와 확대 수준을 설정
      }
    },
    async getKakaoNavi (address) {
      console.log('address:' + address)
      // console.log(routes)
      console.log('출발지:' + address[0][1] + ',' + address[0][0])
      console.log('도착지:' + address[1][1] + ',' + address[1][0])
      // https://cors-anywhere.herokuapp.com 접속 후 request
      // CORS 문제로 다른 사람이 만든 프록시 서버 이용, 추후 헤로쿠 사용하여 해결
      await axios.get(
        'https://cors-anywhere.herokuapp.com/https://apis-navi.kakaomobility.com/v1/directions', {
          headers: { 'Authorization': 'KakaoAK c01ebcf3f04756103db0826a158a5c21'
          },
          params: {
            origin: address[0][1] + ',' + address[0][0], // 출발지 x(경도), y(위도) 좌표
            destination: address[1][1] + ',' + address[1][0], // 도착지 x, y 좌표
            priority: 'RECOMMEND' // 거리, 시간
          }
        }).then((res) => {
        console.log('kakaonavi: ' + res)
        const resultCode = res.data.routes[0].result_code
        if (resultCode === 105) { // 교통 장애가 있다면 출발지와 도착지간의 선 하나만 출력
          alert(res.data.routes[0].result_msg)
          this.setLine(address)
          // return address
        } else if (resultCode === 0) { // 길찾기 성공이면 이동경로 선으로 출력
          this.guides = res.data.routes[0].sections[0].guides
          this.markerPositions2 = this.getAddressList(this.guides)
          console.log(this.markerPositions2) // 카카오네비 결과값 x,y
          this.duration = res.data.routes[0].sections[0].duration
          this.setLineAndOverLay(this.getLinePath(this.markerPositions2), this.duration)
        // return this.markerPositions2
        }
      })
    },
    getAddressList (guides) {
      const arr = new Array(guides.length).fill(0).map(() => new Array(2))
      for (let i = 0; i < guides.length; i++) {
        arr[i][0] = guides[i].placeX
        arr[i][1] = guides[i].placeY
      }
      return arr
    },
    async getDuration (address) {
      console.log('출발지:' + address[0][1] + ',' + address[0][0])
      console.log('도착지:' + address[1][1] + ',' + address[1][0])
      await axios.get(
        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=transit&' +
        'origins=' + address[0][0] + ',' + address[0][1] +
        '&destinations=' + address[1][0] + ',' + address[1][1] +
        '&region=KR&key=AIzaSyDq6BYogP8DXJXho6EXr4A87IeyEqc5lo0'
      ).then((res) => {
        if (res.data.rows[0].elements[0].status === 'ZERO_RESULTS') this.transit = '정보없음'
        else this.transit = res.data.rows[0].elements[0].duration.text
      })
      console.log('이동시간 ' + this.transit)
      return this.transit
    }
  },
  watch: {
    transportation () {
      if (this.transportation === '도보') {
        this.$emit('msg', this.time)
      } else if (this.transportation === '자동차') {
        this.$emit('msg', this.carTime)
      } else if (this.transportation === '대중교통') {
        this.$emit('msg', this.transit)
      }
    },
    markerPositions1 () {
      this.getMidPoint(this.markerPositions1)
      this.getKakaoNavi(this.markerPositions1)
      this.transit = this.getDuration(this.markerPositions1)
    }
  }
}
</script>

<style scoped>
#map {
    margin-left: -20px;
    /* margin-top: 20px; */
    margin-bottom: 20px;
    width:100%;
    height:100%;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

</style>
