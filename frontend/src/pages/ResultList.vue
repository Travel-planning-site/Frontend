<template>
    <div class="ResultList">
      <template v-i="results.length > 0">
        <b-row>
          <b-col xxl="3" xl="4" lg="6" cols="12" v-for="(result, index) in listData" :key="index">
            <result-box :ResultList_result="result" :Image="ImageList[index]" @SelectFromResult_box="SelectFromResult_box"></result-box>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col cols="12" v-for="(result, index) in resultLists" :key="index">
            <result-box :ResultList_result="result" @SelectFromResult_box="SelectFromResult_box"></result-box>
          </b-col>
        </b-row> -->
      </template>
    </div>
</template>

<script>
export default {
  name: 'ResultList',
  props: {
    listData: {
      type: Array
    },
    ImageList: {
      type: Array
    }
  },
  watch: {
    listData () {
      this.results = this.listData
    }
  },
  data () {
    return {
      results: ''
    }
  },
  methods: {
    SelectFromResult_box: function (result) {
      this.$emit('SelectFromResult_List', result)
    }
  }
}
</script>
