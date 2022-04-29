<template>
    <div id="map" style="width:100%; height:736px;"></div>
</template>

<script>
import InputDataForm from './InputDataForm.vue'
export default {
  components: { InputDataForm },
  name: 'KakaoMap',
  data () {
    return {
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        // [33.4524745, 126.5712975]
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912]
      ],
      markers: [],
      infowindow: null
    }
  },
  created () {
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
      const container = document.getElementById('map') // 지도를 표시할 div
      console.log(container)
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 5 // 지도를 확대할 div
      }
      // 지도 객체를 등록합니다.
      // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options) // 지도 생성
      this.displayMarker(this.markerPositions1) // 마커 생성
      const linePath = [
        new kakao.maps.LatLng(this.markerPositions1[0][0], this.markerPositions1[0][1]),
        new kakao.maps.LatLng(this.markerPositions1[1][0], this.markerPositions1[1][1])
      ]

      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#FFAE00', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
      })

      polyline.setMap(this.map)
      console.log(polyline.getLength())
      console.log((this.markerPositions1[1][0] + this.markerPositions1[0][0]) / 2, (this.markerPositions1[1][1] + this.markerPositions1[0][1]) / 2)

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
      content += '        <span class="label">총거리</span><span class="number">' + distance + '</span>m'
      content += '    </li>'
      content += '    <li>'
      content += '        <span class="label">도보</span>' + walkHour + walkMin
      content += '    </li>'
      content += '</ul>'

      const distanceOverlay = new kakao.maps.CustomOverlay({
        map: this.map,
        content: content,
        position: new kakao.maps.LatLng(33.4524745, 126.5712975),
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    margin-left: -20px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

</style>
