<template>
  <div>
    <div>
      <b-pagination v-model="currentPage" pills :total-rows="rows" :per-page="perPage" first-number
        last-number></b-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ['pageSetting'],
  data () {
    return {
      perpage: 4,
      currentPage: 1,
      rows: 10,
      perPage: 9
    }
  },
  watch: {
    currentPage: function () {
      this.$emit('PageChanged', this.currentPage)
    }
  }
}
</script>
