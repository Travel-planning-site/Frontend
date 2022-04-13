<template>
  <div class="savedList">
    <b-container fluid>
      <b-row style="margin: 5px;">
        <b-col>
          <savedplace-box v-if="selected_count" :selectedList="selectedList" @DeleteOnClicked="DeleteOnClicked"></savedplace-box>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'SavedList',
  props: {
    selectedList: {
      type: Object,
      default: () => {
        return {
          place_name: '',
          place_addr: '',
          place_img: ''
        }
      }
    },
    selected_count: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  methods: {
    DeleteOnClicked () {
      console.log('삭제이벤트')
    }
  }
}
</script>
