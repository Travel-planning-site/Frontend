<template>
  <div id="GooglePlacePhoto">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'GooglePlacePhoto',
  props: {
    listData: {
      typs: Array
    }
  },
  data () {
    return {
      ImageList: []
    }
  },
  method: {
    ImageSearch (keyword) {
      axios.get(
        'https://maps.googleapis.com/maps/api/place/photo?maxwidth=275?maxheight=168'
      )
    }
  }
}

</script>
