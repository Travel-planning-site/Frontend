<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.dotOverlay {
  position:relative;
  bottom:50px;
  border-radius:6px;
  border: 1px solid #ccc;
  border-bottom:2px solid #ddd;
  float:left;
  font-size:20px;
  padding:5px;
  background:#fff;
  list-style:none;
  }

.dotOverlay:nth-of-type(n) {
  border:0;
  box-shadow:0px 1px 2px #888;
  }

.number {
  font-weight:bold;
  color:#ee6152;
  }

.dotOverlay:after {
  content:'';
  position:absolute;
  margin-left:-6px;
  left:50%;bottom:-8px;
  width:11px;height:8px;
  background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')}

.distanceInfo .label {
  display:inline-block;
  width:50px;
  }
</style>
