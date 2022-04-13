<template>
    <div class="ResultList">
      <template>
        <result-box :ResultList_results="results" @SelectFromResult_box="SelectFromResult_box"></result-box>
      </template>
    </div>
</template>

<script>
export default {
  name: 'ResultList',
  props: {
    results: {
      type: Object,
      default: () => {
        return {
          place_img: '',
          place_name: '',
          place_addr: ''
        }
      }
    }
  },
  data () {
    return {
      selectedResult: {
        place_img: '',
        place_name: '',
        place_addr: ''
      }
    }
  },
  methods: {
    SelectFromResult_box: function (result) {
      console.log('ResultList 담기 발생')
      this.selectedResult = result
      this.$emit('SelectFromResult_List', this.selectedResult)
    }
  }
}
</script>
