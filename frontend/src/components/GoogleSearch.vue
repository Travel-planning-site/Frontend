<template>
  <div id="GoogleSearch">
  </div>
</template>

<script>
export default {
  name: 'GoogleSearch',
  props: {
    keyword: {
      type: String
    },
    page: {
      type: Number
    }
  },
  methods: {
    googleSearch (keyword, page) {
      axios.get(

      )
    }
  }

}
</script>
